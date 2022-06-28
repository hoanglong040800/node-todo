import express, { Router } from 'express'
import { loginController } from '+modules/auth'
import authValidation from './auth.validation'

const router: Router = express.Router()

router.post('/login', authValidation.login, loginController)
router.put('/refreshToken')
router.post('/signup')

export default router
