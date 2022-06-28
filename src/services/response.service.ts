import { Response } from 'express'

export function buildResponse(
	res: Response,
	status: 200 | 201 | 400 | 401 | 404,
	data: any[] | {} | null,
	message = '',
) {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}
