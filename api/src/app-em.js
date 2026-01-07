import { Brain } from './brain.js'
import { Exchange } from './utils/exchange.js'
import { logger } from './utils/logger.js'

function startTickerMonitor() {
	const exchange = new Exchange()
	exchange.tickerStream(async (markets) => {
		const brain = Brain.getInstance()

		markets.map((mkt) => brain.updateMemory(mkt.symbol, 'TICKER', null, mkt))

		// TODO: Notify the user if any automation has been triggered.
	})

	logger('M-TIKER', 'Ticker Monitor has started!')
}

let WSS

export async function emInit(userId, wssInstance) {
	WSS = wssInstance

	// Test broadcast messages. Connect to ws://localhost:3000
	// setInterval(() => WSS.broadcast({ message: new Date() }), 3000)

	// Market monitoring
	startTickerMonitor()

	// TODO: user account monitoring

	// TODO: asset monitoring (candles)

	logger('system', 'Exchange Monitor has started!')
}
