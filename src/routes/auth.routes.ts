import express, { Router } from 'express'
import { loginController, logoutController } from 'controllers/auth'
import { authValidation } from 'validations'
import refreshTokenController from 'controllers/auth/refreshToken.controller'
import { authenAndValidate } from 'middlewares'

const router: Router = express.Router()

router.post('/login', authenAndValidate(null, authValidation.login), loginController)
router.post('/logout', authenAndValidate(null, authValidation.logout), logoutController)
router.put(
	'/refreshToken',
	authenAndValidate('ANY', authValidation.refreshToken),
	refreshTokenController,
)
router.post('/signup')

export default router
