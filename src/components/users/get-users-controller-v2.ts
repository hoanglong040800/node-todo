import db from 'config/knex'
import { TABLE } from 'constants/table.constants'
import { Request, Response } from 'express'
import { buildResponse } from 'utils'

export default async function getUsersControllerV2(
  req: Request,
  res: Response
) {
  let message = 'Get all users successfully'
  try {
    const users = await db.select(TABLE.USERS.FIELDS.ALL).from(TABLE.USERS.NAME)
    return buildResponse(res, 200, users, message)
  } catch (e) {
    res.sendStatus(500)
  }
}
