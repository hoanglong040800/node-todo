import { USERS_STATUS } from '+modules/users/+core'
import db from 'config/knex'
import { TABLE } from 'const'
import { Request } from 'express'
import { AppResponse } from 'interfaces'
import { empty } from 'utils'

interface IReq extends Request {
	body: {
		email: string
		password: string
	}
}

interface IResData {
	email: string
}

export default async function loginController(req: IReq, res: AppResponse<IResData>) {
	try {
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

		const user = userQuery[0]

		if (empty(user)) {
			return res.status(404).json({
				status: 404,
				message: 'abc',
				data: null,
			})
		}

		if (user.status !== USERS_STATUS.ACTIVE) {
			return res.status(404).json({
				status: 404,
				message: 'abc',
				data: null,
			})
		}

		return user
	} catch (e) {
		res.sendStatus(500)
	}
}
