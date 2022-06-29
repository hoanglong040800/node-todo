import { db } from 'configs'
import { TABLE } from 'const'
import { check, ValidationChain } from 'express-validator'
import { addMiddlewareToValidator, empty } from 'utils'

interface IActions {
	login: ValidationChain[]
	logout: ValidationChain[]
}

const actions: IActions = {
	login: [
		check('email').exists().bail().notEmpty().bail().isString().bail().trim().isEmail(),
		check('password').exists().bail().notEmpty().bail().isString(),
	],
	logout: [
		check('refreshToken')
			.exists()
			.bail()
			.notEmpty()
			.bail()
			.isJWT()
			.bail()
			.custom(async value => {
				const refreshToken = await db
					.select(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN)
					.from(TABLE.USER_TOKENS.NAME)
					.where(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN, value)

				if (empty(refreshToken)) throw new Error('Refresh token not found')
			}),
	],
}

const authValidation: IActions = addMiddlewareToValidator(actions)

export default authValidation
