import { Express } from 'express'
import usersRouter from 'components/users/index'
import tasksRouter from 'components/tasks/index'

export default function (app: Express) {
	app.use('/api/users', usersRouter)
	app.use('/api/tasks', tasksRouter)
}
