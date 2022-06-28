import { check } from 'express-validator'
import { addMiddlewareToValidator } from 'utils'

interface IActions {
	login: any
}

const actions: IActions = {
	login: [
		check('email').exists().bail().notEmpty().bail().isString().bail().trim().isEmail(),
		check('password').exists().bail().notEmpty().bail().isString(),
	],
}

const authValidation: IActions = addMiddlewareToValidator(actions)

export default authValidation
