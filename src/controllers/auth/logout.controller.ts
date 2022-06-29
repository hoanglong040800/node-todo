import { db } from 'configs'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'

interface IReq extends Request {
	body: {
		refreshToken: string
	}
}

export default async function logoutController(req: IReq, res: Response) {
	try {
		await db
			.del()
			.from(TABLE.USER_TOKENS.NAME)
			.where(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN, req.body.refreshToken)

		return buildResponse(res, 200, null, '')
	} catch (e) {
		res.sendStatus(500)
	}
}
