import express, { Router } from 'express'
import createTaskController from './create-task-controller'
import deleteTaskController from './delete-task-controller'
import getTaskDetailController from './get-task-detail-controller'
import getTasksController from './get-tasks.controller'
import TasksValidation from './tasks.validation'
import updateTaskController from './update-task-controller'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get('/:taskId/', TasksValidation.getTaskDetail, getTaskDetailController)
router.post('/', TasksValidation.createTask, createTaskController)
router.put('/:taskId', TasksValidation.updateTask, updateTaskController)
router.delete('/:taskId', TasksValidation.deleteTask, deleteTaskController)

export default router
