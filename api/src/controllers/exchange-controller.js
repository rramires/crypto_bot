import { Brain } from '../brain.js'
import { Exchange } from '../utils/exchange.js'
import { logger } from '../utils/logger.js'

const FIAT = process.env.DEFAULT_FIAT

export async function getBalance(req, res, next) {
	const userId = res.locals.token.id
	const exchange = new Exchange()
	const brain = Brain.getInstance()

	try {
		const info = await exchange.balance()

		let total = 0
		const coins = Object.keys(info)
		await Promise.all(
			coins.map(async (coin) => {
				let partial = parseFloat(info[coin].available) + parseFloat(info[coin].onOrder)
				if (partial > 0) {
					partial = await brain.tryFiatConversion(coin, partial, FIAT)
					info[coin].fiatEstimate = partial
					total += partial
				}
			}),
		)

		info.fiatEstimate = `~${FIAT} ${total.toFixed(2)}`

		res.json(info)
	} catch (err) {
		const message = err.response ? err.response.data : err.message
		logger('U-' + userId, message)
		res.status(500).send(message)
	}
}
