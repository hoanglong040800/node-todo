import db from 'config/knex'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'
import { empty } from 'utils'

export default async function loginController(req: Request, res: Response) {
	try {
		const user = await db
			.select(TABLE.USERS.FIELDS.USER_ID)
			.from(TABLE.USERS.NAME)
			.where(TABLE.USERS.FIELDS.EMAIL, req.body.email)
			.andWhere(TABLE.USERS.FIELDS.PASSWORD, req.body.password)

		if (empty(user)) {
			return buildResponse(res, 404, null, 'Email or password is incorrect')
		}

		return buildResponse(res, 200, null, 'Login successfully')
	} catch (e) {
		res.sendStatus(500)
	}
}
