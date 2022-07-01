import express, { Router } from 'express'
import {
	createTaskController,
	deleteTaskController,
	getTaskDetailController,
	getTasksController,
	updateTaskController,
} from 'controllers/tasks'
import { tasksValidation } from 'validations'
import { validateRequest } from 'middlewares'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get('/:taskId/', validateRequest(tasksValidation.getTaskDetail), getTaskDetailController)
router.post('/', validateRequest(tasksValidation.createTask), createTaskController)
router.put('/:taskId', validateRequest(tasksValidation.updateTask), updateTaskController)
router.delete('/:taskId', validateRequest(tasksValidation.deleteTask), deleteTaskController)

export default router
