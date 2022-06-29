import { db } from 'configs'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'

export default async function getUsersV2Controller(req: Request, res: Response) {
	let message = 'Get all users successfully'
	try {
		const users = await db
			.select(TABLE.USERS.FIELDS.EMAIL, TABLE.USERS.FIELDS.DISPLAY_NAME)
			.from(TABLE.USERS.NAME)
		return buildResponse(res, 200, users, message)
	} catch (e) {
		res.sendStatus(500)
	}
}
