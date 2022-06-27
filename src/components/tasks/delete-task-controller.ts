import db from 'config/knex'
import { TABLE } from 'constants/table.constants'
import { Request, Response } from 'express'
import { buildResponse, empty } from 'utils'

export default async function deleteTaskController(req: Request, res: Response) {
	try {
		const taskDetail = await db
			.select(TABLE.TASKS.FIELDS.TASK_ID)
			.from(TABLE.TASKS.NAME)
			.where({
				[TABLE.TASKS.FIELDS.TASK_ID]: req.params.taskId,
			})

		if (empty(taskDetail)) {
			return buildResponse(res, 404, null, 'Task not found')
		}

		await db(TABLE.TASKS.NAME)
			.del()
			.where({
				[TABLE.TASKS.FIELDS.TASK_ID]: req.params.taskId,
			})

		return buildResponse(res, 200, null, 'Delete task successfully')
	} catch (e) {
		res.sendStatus(500)
	}
}
