import db from 'configs/knex'
import { TABLE } from 'const'
import { Request, Response } from 'express'
import { buildResponse } from 'services'

export default async function getTasksController(req: Request, res: Response) {
	let message = 'Get all tasks by current user successfully'
	try {
		const tasks = await db
			.select(TABLE.TASKS.FIELDS.TASK_ID, TABLE.TASKS.FIELDS.CONTENT, TABLE.TASKS.FIELDS.CREATED_AT)
			.from(TABLE.TASKS.NAME)
			.join(TABLE.USERS.NAME, TABLE.USERS.FIELDS.USER_ID, TABLE.TASKS.FIELDS.USER_ID)
			.where(TABLE.USERS.FIELDS.USER_ID, '24d0c684-30e1-40b0-9b1b-1d1609cc05d5')

		return buildResponse(res, 200, tasks[0], message)
	} catch (e) {
		res.sendStatus(500)
	}
}
