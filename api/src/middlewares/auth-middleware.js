import jwt from 'jsonwebtoken'

import { isBlackList } from '../controllers/auth-controller.js'
import { logger } from '../utils/logger.js'

export function authMiddleware(req, res, next) {
	const token = req.headers['authorization']

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			if (decoded) {
				const isBlackListed = isBlackList(token)

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
