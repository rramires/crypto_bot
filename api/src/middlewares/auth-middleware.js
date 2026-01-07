import jwt from 'jsonwebtoken'

import { isBlackList } from '../controllers/auth-controller.js'
import { logger } from '../utils/logger.js'

export async function authMiddleware(req, res, next) {
	const token = req.headers['authorization']

	if (token) {
		try {
			const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token

			const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET)

			if (decoded) {
				const isBlackListed = await isBlackList(cleanToken)

				if (!isBlackListed) {
					res.locals.token = decoded
					return next()
				}
			}
		} catch (err) {
			logger('system', err)
		}
	}
	res.sendStatus(401)
}
