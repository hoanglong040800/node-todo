import { JwtPayload } from 'jsonwebtoken'
import { USER_STATUS } from '../const/users.constants'

export interface IUser {
	userId: string
	displayName: string
	email?: string
	status: USER_STATUS
}

export interface ITokenData extends JwtPayload {
	userId: string
	displayName: string
	email?: string
	status: USER_STATUS
}
