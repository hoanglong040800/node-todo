import express, { Router } from 'express'
import getTaskDetailController from './get-task-detail-controller'
import getTasksController from './get-tasks.controller'

const router: Router = express.Router()


router.get('/', getTasksController)
router.get('/:taskId/', getTaskDetailController)
// router.post('/')
// router.put('/:taskId')
// router.delete('/:taskId')

export default router
