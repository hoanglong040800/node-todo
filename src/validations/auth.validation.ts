import { db } from 'configs'
import { TABLE } from 'const'
import { check, ValidationChain } from 'express-validator'
import { empty } from 'utils'

interface IActions {
	login: ValidationChain[]
	logout: ValidationChain[]
	refreshToken: ValidationChain[]
}

interface IFields {
	refreshToken: ValidationChain
}

const fields: IFields = {
	refreshToken: check('refreshToken').exists().bail().notEmpty().bail().isJWT().bail(),
}

const actions: IActions = {
	login: [
		check('email').exists().bail().notEmpty().bail().isString().bail().trim().isEmail(),
		check('password').exists().bail().notEmpty().bail().isString(),
	],

	logout: [
		fields.refreshToken.custom(async value => {
			const refreshToken = await db
				.select(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN)
				.from(TABLE.USER_TOKENS.NAME)
				.where(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN, value)

			if (empty(refreshToken)) throw new Error('Refresh token not found')
		}),
	],

	refreshToken: [
		fields.refreshToken.custom(async value => {
			const refreshTokenQuery = await db
				.select(
					TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN,
					TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN_EXPIRE,
				)
				.from(TABLE.USER_TOKENS.NAME)
				.where(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN, value)

			if (empty(refreshTokenQuery)) throw new Error('Refresh token not found')

			if (refreshTokenQuery[0].refreshTokenExpire < new Date())
				throw new Error('Refresh token expired')
		}),
	],
}

export default actions
