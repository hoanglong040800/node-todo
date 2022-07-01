import { db } from 'configs'
import { TABLE, USER_STATUS } from 'const'
import { Request, Response } from 'express'
import { buildResponse, generateToken } from 'services'
import { convertQueryObjToObj, empty } from 'utils'
import { ITokenData, IUser } from 'interfaces'

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

export default async function loginController(req: IReq, res: Response) {
	try {
		const { user } = await queryLogic(req)

		if (empty(user)) {
			return buildResponse(res, 400, null, 'Email or password is incorrect')
		}

		if (user.status !== USER_STATUS.ACTIVE) {
			return buildResponse(res, 400, null, 'User is inactive')
		}

		const tokenData: ITokenData = user

		const [accessToken, accessTokenExpire] = generateToken('ACCESS', tokenData)
		const [refreshToken, refreshTokenExpire] = generateToken('REFRESH', tokenData)

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

		return buildResponse(res, 200, resData, 'Login successfully')
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
