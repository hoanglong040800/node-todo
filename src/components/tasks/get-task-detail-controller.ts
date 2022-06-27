import db from 'config/knex'
import { TABLE } from 'constants/table.constants'
import { Request, Response } from 'express'
import { buildResponse, empty } from 'utils'

export default async function getTaskDetailController(req: Request, res: Response) {
	try {
		const taskDetail = await db
			.select(
				TABLE.TASKS.FIELDS.TASK_ID,
				TABLE.TASKS.FIELDS.CONTENT,
				TABLE.TASKS.FIELDS.CREATED_AT,
				
				TABLE.USERS.FIELDS.USER_ID,
				TABLE.USERS.FIELDS.DISPLAY_NAME,
			)
			.from(TABLE.TASKS.NAME)
			.join(TABLE.USERS.NAME, TABLE.USERS.FIELDS.USER_ID, TABLE.TASKS.FIELDS.USER_ID)
			.where({
				[TABLE.TASKS.FIELDS.TASK_ID]: req.params.taskId,
			})

		if (empty(taskDetail)) {
			return buildResponse(res, 404, null, 'Task not found')
		}

		return buildResponse(res, 200, taskDetail[0], 'Get task detail successfully')
	} catch (e) {
		res.status(500).send(e)
	}
}
