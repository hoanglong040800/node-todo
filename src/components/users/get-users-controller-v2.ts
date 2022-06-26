import db from 'config/knex'
import { Request, Response } from 'express'

export default async function getUsersControllerV2(
  req: Request,
  res: Response
) {
  try {
    const users = await db('users').select('*')
    res.status(200).json(users)
  } catch (e) {
    res.status(500).send('Get all users V2 failed')
  }
}
