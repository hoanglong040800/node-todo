import { NextFunction, Request, Response } from 'express'
import { ValidationError, validationResult } from 'express-validator'

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

export function validateRequest(req: Request, res: Response, next: NextFunction) {
	const validationErrors = validationResult(req)
		.array()
		.map(({ location, param, msg }: ValidationError) => `${location}.${param}: ${msg}`)
		.join('; ')

	if (validationErrors) {
		return buildResponse(res, 400, null, validationErrors)
	}

	next()
}

export function mapValidatorsWithHandler(validators: any) {
	for (let key in validators) {
		validators[key] = [...validators[key], validateRequest]
	}

	return validators
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

export function convertQueryObjToObj(queryObj: any) {
	const keyValues = Object.keys(queryObj).map(key => {
		const newKey = key.substring(key.indexOf('.') + 1)

		return { [newKey]: queryObj[key] }
	})

	return Object.assign({}, ...keyValues)
}
