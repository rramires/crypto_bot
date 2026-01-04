import { Exchange } from '../utils/exchange.js'
import { logger } from '../utils/logger.js'

const FIAT = process.env.DEFAULT_FIAT

export async function getBalance(req, res, next) {
	const userId = res.locals.token.id

	const exchange = new Exchange()

	try {
		const info = await exchange.balance()
		info.fiatEstimate = `~${FIAT} 100` // TODO: Implement this

		res.json(info)
	} catch (err) {
		const message = err.response ? err.response.data : err.message
		logger('U-' + userId, message)
		res.status(500).send(message)
	}
}
