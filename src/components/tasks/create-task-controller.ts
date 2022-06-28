import db from 'config/knex'
import { TABLE } from 'constants/table.constants'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { buildResponse, convertQueryObjToObj } from 'utils'

export default async function createTaskController(req: Request, res: Response) {
	try {
		const result = await db(TABLE.TASKS.NAME).insert(
			convertQueryObjToObj({
				[TABLE.TASKS.FIELDS.TASK_ID]: randomUUID(),
				[TABLE.TASKS.FIELDS.CONTENT]: req.body.content,
				[TABLE.TASKS.FIELDS.USER_ID]: '24d0c684-30e1-40b0-9b1b-1d1609cc05d5',
			}),
			TABLE.TASKS.FIELDS.TASK_ID,
		)

		return buildResponse(res, 201, result[0], 'Create task successfully')
	} catch (e) {
		res.status(500).send(e)
	}
}
