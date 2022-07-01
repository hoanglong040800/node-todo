import { Request, Response } from 'express'
import { buildResponse, generateToken } from 'services'
import jwt from 'jsonwebtoken'
import { db } from 'configs'
import { TABLE } from 'const'
import { convertQueryObjToObj } from 'utils'
import { ITokenData } from 'interfaces'

interface IReq extends Request {
	body: {
		refreshToken: string
	}
}

interface IResData {
	accessToken: string
	accessTokenExpire: Date
}

export default async function refreshTokenController(req: IReq, res: Response) {
	try {
		const { refreshToken } = req.body

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || '', err => err && res.status(403))

		const decodedToken = jwt.decode(refreshToken) as ITokenData
		delete decodedToken.exp //avoid bad option expiresIn error

		const [accessToken, accessTokenExpire] = generateToken('ACCESS', decodedToken)

		await db(TABLE.USER_TOKENS.NAME)
			.update(
				convertQueryObjToObj({
					[TABLE.USER_TOKENS.FIELDS.ACCESS_TOKEN]: accessToken,
					[TABLE.USER_TOKENS.FIELDS.ACCESS_TOKEN_EXPIRE]: accessTokenExpire,
				}),
			)
			.where(TABLE.USER_TOKENS.FIELDS.REFRESH_TOKEN, refreshToken)

		const resData: IResData = {
			accessToken,
			accessTokenExpire,
		}

		buildResponse(res, 200, resData, 'Refresh token successfully')
	} catch (e) {
		res.status(500).send(e)
	}
}
