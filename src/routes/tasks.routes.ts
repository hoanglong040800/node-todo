import express, { Router } from 'express'
import {
	createTaskController,
	deleteTaskController,
	getTaskDetailController,
	getTasksController,
	updateTaskController,
} from 'controllers/tasks'
import { tasksValidation } from 'validations'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get('/:taskId/', tasksValidation.getTaskDetail, getTaskDetailController)
router.post('/', tasksValidation.createTask, createTaskController)
router.put('/:taskId', tasksValidation.updateTask, updateTaskController)
router.delete('/:taskId', tasksValidation.deleteTask, deleteTaskController)

export default router
