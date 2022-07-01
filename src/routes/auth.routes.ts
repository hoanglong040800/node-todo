import express, { Router } from 'express'
import { loginController, logoutController } from 'controllers/auth'
import { authValidation } from 'validations'
import refreshTokenController from 'controllers/auth/refreshToken.controller'

const router: Router = express.Router()

router.post('/login', authValidation.login, loginController)
router.post('/logout', authValidation.logout, logoutController)
router.put('/refreshToken', authValidation.refreshToken, refreshTokenController)
router.post('/signup')

export default router
