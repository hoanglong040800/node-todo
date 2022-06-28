import db from 'config/knex'
import { TABLE } from 'const'

import { check, ValidationChain } from 'express-validator'
import { empty, mapValidatorsWithHandler } from 'utils'

interface ITaskValidationFields {
	taskId: ValidationChain
	taskIdCustom: ValidationChain
	content: ValidationChain
}

interface ITaskValidationActions {
	createTask: any
	getTaskDetail: any
	deleteTask: any
	updateTask: any
}

interface ITaskValidation {
	fields: ITaskValidationFields
	actions: ITaskValidationActions
}

const fields: ITaskValidationFields = {
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

const actions: ITaskValidationActions = {
	createTask: [fields.content],
	getTaskDetail: [fields.taskId],
	deleteTask: [fields.taskIdCustom],
	updateTask: [fields.taskIdCustom, fields.content],
}

const tasksValidation: ITaskValidation = {
	fields,
	actions: mapValidatorsWithHandler(actions),
}

export default tasksValidation
