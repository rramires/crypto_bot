import { logger } from '../utils/logger.js'

export function errorMiddleware(err, req, res, next) {
	logger('system', err)

	if (res.headersSent) {
		return next(err)
	}

	res.status(500).json(err.response ? err.response.data : err.message)
}
