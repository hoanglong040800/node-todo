import { NextFunction, Request, Response } from "express"
import { ValidationError, validationResult } from "express-validator"
import { buildResponse } from "services"

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