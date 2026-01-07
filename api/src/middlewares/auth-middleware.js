import { validateToken } from '../utils/auth-service.js'

export async function authMiddleware(req, res, next) {
	const token = req.headers['authorization']
	const result = await validateToken(token)

	if (!result.valid) {
		return res.sendStatus(401)
	}

	res.locals.token = result.decoded
	return next()
}
