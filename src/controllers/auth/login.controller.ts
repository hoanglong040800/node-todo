import { db } from 'configs'
import { TABLE, USER_STATUS } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'
import { convertQueryObjToObj, empty } from 'utils'
import { IUser } from 'interfaces'
import jwt from 'jsonwebtoken'

interface IReq extends Request {
	body: {
		email: string
		password: string
	}
}

interface IResData {
	user: IUser
	accessToken: string
	accessTokenExpire: Date
	refreshToken: string
	refreshTokenExpire: Date
}

// milisecond
const ACCESS_TOKEN_EXPIRES_IN = 0.5 * 60 * 1000
const REFRESH_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000

export default async function loginController(req: IReq, res: Response) {
	try {
		const { user } = await queryLogic(req)

		if (empty(user)) {
			return buildResponse(res, 400, null, 'Email or password is incorrect')
		}

		if (user.status !== USER_STATUS.ACTIVE) {
			return buildResponse(res, 400, null, 'User is inactive')
		}

		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '', {
			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
		})

		const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '', {
			expiresIn: REFRESH_TOKEN_EXPIRES_IN,
		})

		const accessTokenExpire = new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRES_IN)
		const refreshTokenExpire = new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN)

		await db(TABLE.USER_TOKENS.NAME).insert(
			convertQueryObjToObj({
				[TABLE.USER_TOKENS.FIELDS.ACCESS_TOKEN]: accessToken,
				[TABLE.USER_TOKENS.FIELDS.ACCESS_TOKEN_EXPIRE]: accessTokenExpire,
				[TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN]: refreshToken,
				[TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN_EXPIRE]: refreshTokenExpire,
			}),
		)

		const resData: IResData = {
			user,
			accessToken,
			accessTokenExpire,
			refreshToken,
			refreshTokenExpire,
		}

		return buildResponse(res, 201, resData, 'Login successfully')
	} catch (e) {
		res.status(500).send(e)
	}
}

async function queryLogic(req: Request) {
	const userQuery = await db
		.select(
			TABLE.USERS.FIELDS.USER_ID,
			TABLE.USERS.FIELDS.EMAIL,
			TABLE.USERS.FIELDS.DISPLAY_NAME,
			TABLE.USERS.FIELDS.STATUS,
		)
		.from(TABLE.USERS.NAME)
		.where(TABLE.USERS.FIELDS.EMAIL, req.body.email)
		.andWhere(TABLE.USERS.FIELDS.PASSWORD, req.body.password)

	const user: IUser = userQuery[0]

	return { user }
}
