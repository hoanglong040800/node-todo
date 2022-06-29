import { API_VERSIONS } from 'const/common.constants'
import express, { Router } from 'express'
import { getUsersController, getUsersV2Controller } from 'controllers/users'
const versionRoutes = require('express-routes-versioning')()

const router: Router = express.Router()

router.get(
	'/',
	versionRoutes({
		[API_VERSIONS.V1]: getUsersController,
		[API_VERSIONS.V2]: getUsersV2Controller,
	}),
)

export default router
