import db from 'configs/knex'
import { TABLE } from 'const'
import { check, ValidationChain } from 'express-validator'
import { empty, addMiddlewareToValidator } from 'utils'

interface IFields {
	taskId: ValidationChain
	taskIdCustom: ValidationChain
	content: ValidationChain
}

interface IActions {
	createTask: any
	getTaskDetail: any
	deleteTask: any
	updateTask: any
}

const fields: IFields = {
	content: check('content').exists().bail().isString().bail().trim().isLength({ max: 255 }),

	taskId: check('taskId').exists().bail().notEmpty().bail().isUUID(),

	taskIdCustom: check('taskId')
		.exists()
		.bail()
		.notEmpty()
		.bail()
		.isUUID()
		.bail()
		.custom(async value => {
			const task = await db
				.select(TABLE.TASKS.FIELDS.TASK_ID)
				.from(TABLE.TASKS.NAME)
				.where(TABLE.TASKS.FIELDS.TASK_ID, value)

			if (empty(task)) {
				throw new Error('Task not found')
			}
		}),
}

const actions: IActions = {
	createTask: [fields.content],
	getTaskDetail: [fields.taskId],
	deleteTask: [fields.taskIdCustom],
	updateTask: [fields.taskIdCustom, fields.content],
}

const tasksValidation: IActions = addMiddlewareToValidator(actions)

export default tasksValidation
