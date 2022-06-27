import { Response } from 'express'

export function buildResponse(
	res: Response,
	status: 200 | 201 | 400 | 401 | 404 | 500,
	data: any[] | {} | null,
	message = '',
) {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}

export function validateUUID(str: string) {
	const regex =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
	return regex.test(str)
}

export function empty(val: any) {
	if (val === undefined) return true

	if (
		typeof val == 'function' ||
		typeof val == 'number' ||
		typeof val == 'boolean' ||
		Object.prototype.toString.call(val) === '[object Date]'
	)
		return false

	if (val == null || val.length === 0) return true

	if (typeof val == 'object') {
		var r = true

		for (var f in val) r = false
		return r
	}

	return false
}

export function notEmpty(val: any) {
	return !empty(val)
}
