import { Express } from 'express'
import { tasksRouter } from '+modules/tasks/+core'
import { usersRouter } from '+modules/users/+core'

export default function (app: Express) {
	app.use('/api/users', usersRouter)
	app.use('/api/tasks', tasksRouter)
}