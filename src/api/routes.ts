import { Express } from 'express'
import { UsersRoute, UsersRouteV2 } from 'api/components/users'

export default function (app: Express) {
  UsersRoute(app)
  UsersRouteV2(app)
}
