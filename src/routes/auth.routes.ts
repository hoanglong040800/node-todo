import express, { Router } from 'express'
import { loginController, logoutController } from 'controllers/auth'
import { authValidation } from 'validations'

const router: Router = express.Router()

router.post('/login', authValidation.login, loginController)
router.post('/logout', authValidation.logout, logoutController)
router.put('/refreshToken')
router.post('/signup')

export default router
