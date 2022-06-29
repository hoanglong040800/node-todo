import { IUser, USER_STATUS } from '+modules/users/+core'
import db from 'config/knex'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'
import { empty } from 'utils'
import jwt from 'jsonwebtoken'
import { Console } from 'console'

interface IReq extends Request {
	body: {
		email: string
		password: string
	}
}

interface IResData {
	user: IUser
	accessToken: string
	expire: Date
	refreshToken: string
}

const ACCESS_TOKEN_EXPIRE = 30 //minutes
const REFRESH_TOKEN_EXPIRE = 30 * 60 * 60 * 60

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
			expiresIn: ACCESS_TOKEN_EXPIRE,
		})

		const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '', {
			expiresIn: REFRESH_TOKEN_EXPIRE,
		})

		const expire = new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRE * 60000)

		const resData: IResData = {
			user,
			accessToken,
			expire,
			refreshToken,
		}

		return buildResponse(res, 201, resData, 'Login successfully')
	} catch (e) {
		res.sendStatus(500)
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
