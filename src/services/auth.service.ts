import { ITokenData } from 'interfaces'
import jwt from 'jsonwebtoken'

const tokenConfig = {
	ACCESS: {
		field: 'accessToken',
		fieldExpire: 'accessTokenExpire',
		sceret: process.env.ACCESS_TOKEN_SECRET,
		expireIn: 0.5 * 60 * 1000, // milisecond
	},
	REFRESH: {
		field: 'refreshToken',
		fieldExpire: 'refreshTokenExpire',
		sceret: process.env.REFRESH_TOKEN_SECRET,
		expireIn: 30 * 24 * 60 * 60 * 1000, // milisecond
	},
}

export function generateToken(type: 'ACCESS' | 'REFRESH', payload: ITokenData): [string, Date] {
	const token = jwt.sign(payload, tokenConfig[type].sceret || '', {
		expiresIn: tokenConfig[type].expireIn,
	})

	const tokenExpire = new Date(new Date().getTime() + tokenConfig[type].expireIn)

	return [token, tokenExpire]
}
