import { NextFunction, Request, Response } from 'express'
import { ValidationChain, ValidationError, validationResult } from 'express-validator'
import { ITokenData } from 'interfaces'
import { buildResponse } from 'services'
import jwt from 'jsonwebtoken'

export function validateRequest(validationChains: ValidationChain[]) {
	return [
		...validationChains,

		(req: Request, res: Response, next: NextFunction) => {
			const validationErrors = validationResult(req)
				.array()
				.map(({ location, param, msg }: ValidationError) => `${location}.${param}: ${msg}`)
				.join('; ')

			if (validationErrors) {
				return buildResponse(res, 400, null, validationErrors)
			}

			next()
		},
	]
}

export function authGuard(roles: string[] = []) {
	return [
		(req: Request, res: Response, next: NextFunction) => {
			const accessToken = req.headers.authorization?.split(' ')[1]

			if (!accessToken) return buildResponse(res, 401, null, 'Unauthorize')

			const decodedData = jwt.decode(accessToken) as ITokenData

			if (!roles.includes(decodedData?.role)) return buildResponse(res, 401, null, 'Unauthorize')

			next()
		},
	]
}
