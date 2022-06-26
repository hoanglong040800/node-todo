import { API_VERSIONS } from 'constants/common.constants'
import express, { Router } from 'express'
import getUsersController from './get-users-controller'
import getUsersControllerV2 from './get-users-controller-v2'
const versionRoutes = require('express-routes-versioning')()

const router: Router = express.Router()

router.get(
  '/',
  versionRoutes({
    [API_VERSIONS.V1]: getUsersController,
    [API_VERSIONS.V2]: getUsersControllerV2,
  })
)

export default router
