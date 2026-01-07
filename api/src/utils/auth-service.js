import jwt from 'jsonwebtoken'

import { isBlacklisted } from './blacklist.js'
import { logger } from './logger.js'

function cleanToken(token) {
	return token?.startsWith('Bearer ') ? token.slice(7) : token
}

export async function generateToken(userId) {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: parseInt(process.env.JWT_EXPIRES),
	})
}

export async function validateToken(token, stripBearer = true) {
	if (!token) {
		return { valid: false, error: 'Token not provided' }
	}

	const cleanedToken = stripBearer ? cleanToken(token) : token

	if (isBlacklisted(cleanedToken)) {
		return { valid: false, error: 'Token is blacklisted' }
	}

	try {
		const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET)
		return { valid: true, decoded }
	} catch (err) {
		if (process.env.JWT_LOGS === 'true') {
			if (err.name === 'TokenExpiredError') {
				logger('system', 'JWT expired')
			} else if (err.name === 'JsonWebTokenError') {
				logger('system', `JWT error: ${err.message}`)
			} else {
				logger('system', err)
			}
		}
		return { valid: false, error: err.message }
	}
}
