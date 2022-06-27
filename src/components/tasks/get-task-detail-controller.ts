import db from 'config/knex'
import { TABLE } from 'constants/table.constants'
import { Request, Response } from 'express'
import { buildResponse, empty } from 'utils'

export default async function getTaskDetailController(req: Request, res: Response) {
	try {
		const tasks = await db
			.select(
				TABLE.TASKS.FIELDS.TASK_ID,
				TABLE.TASKS.FIELDS.CONTENT,
				TABLE.TASKS.FIELDS.CREATED_AT,
				TABLE.USERS.FIELDS.DISPLAY_NAME,
			)
			.from(TABLE.TASKS.NAME)
			.join(TABLE.USERS.NAME, TABLE.USERS.FIELDS.USER_ID, TABLE.TASKS.FIELDS.USER_ID)
			.where(TABLE.USERS.FIELDS.USER_ID, '=', '24d0c684-30e1-40b0-9b1b-1d1609cc05d5')
			.andWhere(TABLE.TASKS.FIELDS.TASK_ID, '=', req.params.taskId)

		if (empty(tasks)) {
			return buildResponse(res, 404, null, 'Task not found')
		}

		return buildResponse(res, 200, tasks[0], 'Get task detail successfully')
	} catch (e) {
		res.sendStatus(500)
	}
}
