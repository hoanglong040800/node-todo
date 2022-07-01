import express, { Router } from 'express'
import {
	createTaskController,
	deleteTaskController,
	getTaskDetailController,
	getTasksController,
	updateTaskController,
} from 'controllers/tasks'
import { tasksValidation } from 'validations'
import { authenAndValidate } from 'middlewares'
import { ROLES } from 'auth'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get(
	'/:taskId/',
	authenAndValidate([ROLES.NORMAL_USER], tasksValidation.getTaskDetail),
	getTaskDetailController,
)
router.post(
	'/',
	authenAndValidate([ROLES.NORMAL_USER], tasksValidation.createTask),
	createTaskController,
)
router.put(
	'/:taskId',
	authenAndValidate([ROLES.NORMAL_USER], tasksValidation.updateTask),
	updateTaskController,
)
router.delete(
	'/:taskId',
	authenAndValidate([ROLES.NORMAL_USER], tasksValidation.deleteTask),
	deleteTaskController,
)

export default router
