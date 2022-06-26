import { Request, Response } from 'express'

export default function GetUsersController(req: Request, res: Response) {
  try {
    res.send('Get all users success')
  } catch (e) {
    res.status(500).send('Get all users failed')
  }
}
