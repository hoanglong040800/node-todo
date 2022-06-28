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
router.get('/:taskId/', tasksValidation.actions.getTaskDetail, getTaskDetailController)
router.post('/', tasksValidation.actions.createTask, createTaskController)
router.put('/:taskId', tasksValidation.actions.updateTask, updateTaskController)
router.delete('/:taskId', tasksValidation.actions.deleteTask, deleteTaskController)

export default router
