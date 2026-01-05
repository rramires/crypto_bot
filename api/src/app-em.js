import { Exchange } from './utils/exchange.js'
import { logger } from './utils/logger.js'

function startTickerMonitor() {
	const exchange = new Exchange()
	exchange.tickerStream(async (markets) => {
		console.log(markets)
	})

	logger('M-TIKER', 'Ticker Monitor has started!')
}

export async function emInit(userId) {
	// Market monitoring
	startTickerMonitor()

	// TODO: user account monitoring

	// TODO: asset monitoring (candles)

	logger('system', 'Exchange Monitor has started!')
}
