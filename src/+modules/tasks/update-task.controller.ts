import db from 'config/knex'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'
import { convertQueryObjToObj } from 'utils'

export default async function updateTaskController(req: Request, res: Response) {
	try {
		await db(TABLE.TASKS.NAME)
			.update(
				convertQueryObjToObj({
					[TABLE.TASKS.FIELDS.CONTENT]: req.body.content,
					[TABLE.TASKS.FIELDS.UPDATED_AT]: db.fn.now(),
				}),
				TABLE.TASKS.FIELDS.TASK_ID,
			)
			.where(TABLE.TASKS.FIELDS.TASK_ID, req.params.taskId)

		return buildResponse(res, 200, null, 'Update task successfully')
	} catch (e) {
		res.status(500).send(e)
	}
}
