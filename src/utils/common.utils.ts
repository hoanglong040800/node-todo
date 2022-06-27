import { Response } from 'express'

export function buildResponse(
  res: Response,
  data: any[] | Object,
  status: 200 | 201 | 400 | 401 | 404 | 500,
  message = ''
) {
  return res.status(status).json({
    data: data,
    status: status,
    message: message,
  })
}
