import { Response } from 'express'

type TypedResponse<T> = Omit<Response, 'json' | 'status'> & {
	json(data: T): TypedResponse<T>
} & { status(code: 200 | 201 | 400 | 404): TypedResponse<T> }

export type AppResponse<D = void> = TypedResponse<{
	data: D | null
	status: 200 | 201 | 400 | 404
	message: string
}>
