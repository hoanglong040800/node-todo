import { Express } from 'express'
import { authRouter, tasksRouter, usersRouter } from 'routes'

export default function (app: Express) {
	app.use('/api/users', usersRouter)
	app.use('/api/tasks', tasksRouter)

	app.use('/api', authRouter)
}
