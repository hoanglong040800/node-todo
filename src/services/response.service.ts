import { Response } from 'express'

export function buildResponse(
	res: Response,
	status: 200 | 201 | 400 | 401 | 403 | 404,
	data: any,
	message = '',
) {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}

//#region deprecated

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
	json(data: T): TypedResponse<T>
} & { status(code: 200 | 201 | 400 | 404): TypedResponse<T> }

export type AppResponse<T = void> = TypedResponse<{
	data: T | null
	status: 200 | 201 | 400 | 404
	message: string
}>

// U type is make to force T to be required
function buildResponseV2<T = never, U extends T = T>(
	res: Response,
	status: 200 | 201 | 400 | 401 | 404,
	data: U | null,
	message = '',
): AppResponse<U> {
	return res.status(status).json({
		data: data,
		status: status,
		message: message,
	})
}

//#endregion deprecated
