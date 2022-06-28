import {
	createTaskController,
	deleteTaskController,
	getTaskDetailController,
	getTasksController,
	updateTaskController,
} from '+modules/tasks'
import express, { Router } from 'express'
import tasksValidation from './tasks.validation'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get('/:taskId/', tasksValidation.getTaskDetail, getTaskDetailController)
router.post('/', tasksValidation.createTask, createTaskController)
router.put('/:taskId', tasksValidation.updateTask, updateTaskController)
router.delete('/:taskId', tasksValidation.deleteTask, deleteTaskController)

export default router
