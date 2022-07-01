import { NextFunction, Request, Response } from 'express'
import { ValidationChain, ValidationError, validationResult } from 'express-validator'
import { ITokenData } from 'interfaces'
import { buildResponse } from 'services'
import jwt from 'jsonwebtoken'
import { ROLES } from 'auth'

function validateRequest(validationChains: ValidationChain[] = []) {
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

			return next()
		},
	]
}

function authGuard(allowedRoles: ROLES[] | null | 'ANY') {
	return [
		(req: Request, res: Response, next: NextFunction) => {
			if (!allowedRoles) return next()

			const accessToken = req.headers.authorization?.split(' ')[1]

			if (!accessToken) return buildResponse(res, 401, null, 'Unauthorize')

			if (allowedRoles === 'ANY') return next()

			const decodedData = jwt.decode(accessToken) as ITokenData

			if (decodedData?.role === ROLES.SUPER_ADMIN) return next()

			if (!allowedRoles?.includes(decodedData?.role))
				return buildResponse(res, 401, null, 'Unauthorize')

			return next()
		},
	]
}

export function authenAndValidate(
	allowedRoles: ROLES[] | null | 'ANY',
	validationChains?: ValidationChain[],
) {
	return [...authGuard(allowedRoles), ...validateRequest(validationChains)]
}
