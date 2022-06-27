import { Request, Response } from 'express'
import { buildResponse } from 'utils'

export default async function createTaskController(req: Request, res: Response) {
	try {
		buildResponse(res, 201, null, 'Create task successfully')
	} catch (e) {
		res.sendStatus(500)
	}
}
