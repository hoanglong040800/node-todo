import express, { Router } from 'express'
import createTaskController from './create-task-controller'
import deleteTaskController from './delete-task-controller'
import getTaskDetailController from './get-task-detail-controller'
import getTasksController from './get-tasks.controller'
import TasksValidation from './tasks.validation'

const router: Router = express.Router()

router.get('/', getTasksController)
router.get('/:taskId/', TasksValidation.getTaskDetail, getTaskDetailController)
router.post('/', TasksValidation.createTask, createTaskController)
// router.put('/:taskId')
router.delete('/:taskId', TasksValidation.deleteTask, deleteTaskController)

export default router
