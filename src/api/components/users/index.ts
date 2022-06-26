import express, { Router, Express } from 'express'
import GetUsersController from './get-users-controller'

const router: Router = express.Router()

export function UsersRoute(app: Express) {
  router.get('/', GetUsersController)

  app.use('/api/v1/users', router)
}

export function UsersRouteV2(app: Express) {
  router.get('/', GetUsersController)

  app.use('/api/v2/users', router)
}
