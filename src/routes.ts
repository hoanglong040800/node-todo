import { Express } from 'express'
import usersRouter from 'components/users/index'

export default function (app: Express) {
  app.use('/api/users', usersRouter)
}
