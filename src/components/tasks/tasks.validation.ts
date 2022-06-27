import { check } from 'express-validator'
import { mapValidatorsWithHandler } from 'utils'

interface ITasksValidation {
	createTask: any
	getTaskDetail: any
}

const validators: ITasksValidation = {
	createTask: [check('content').trim().isLength({ max: 255 })],
	getTaskDetail: [check('taskId').exists().notEmpty().isUUID()],
}

const TasksValidation: ITasksValidation = mapValidatorsWithHandler(validators)

export default TasksValidation
