import { Response } from 'express'
import { ITokenData } from 'interfaces'
import jwt from 'jsonwebtoken'

export function buildResponse(
	res: Response,
	status: 200 | 201 | 400 | 401 | 403 | 404,
	data: any,
	message = '',
) {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}

//#region deprecated

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
	json(data: T): TypedResponse<T>
} & { status(code: 200 | 201 | 400 | 404): TypedResponse<T> }

export type AppResponse<T = void> = TypedResponse<{
	data: T | null
	status: 200 | 201 | 400 | 404
	message: string
}>

// U type is make to force T to be required
function buildResponseV2<T = never, U extends T = T>(
	res: Response,
	status: 200 | 201 | 400 | 401 | 404,
	data: U | null,
	message = '',
): AppResponse<U> {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}

//#endregion deprecated

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
