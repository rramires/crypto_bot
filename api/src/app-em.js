import { Brain } from './brain.js'
import { Exchange } from './utils/exchange.js'
import { logger } from './utils/logger.js'

let WSS

function startTickerMonitor() {
	const exchange = new Exchange()
	exchange.tickerStream(async (markets) => {
		try {
			const brain = Brain.getInstance()

			const results = await Promise.all(
				markets.map((mkt) => brain.updateMemory(mkt.symbol, 'TICKER', null, mkt)),
			)

			const validResults = results.filter(Boolean)
			validResults.forEach((res) => {
				WSS.broadcast({ notification: res })
			})
		} catch (error) {
			logger('M-TICKER', 'Error processing ticker data:', error)
		}
	})

	logger('M-TICKER', 'Ticker Monitor has started!')
}

export async function emInit(userId, wssInstance) {
	WSS = wssInstance

	// Test broadcast messages with Postman. Connect to ws://localhost:3000?token=valid-JWT-token
	//setInterval(() => WSS.broadcast({ notification: { type: 'success', text: new Date() } }), 3000)

	// Market monitoring
	startTickerMonitor()

	// TODO: user account monitoring

	// TODO: asset monitoring (candles)

	logger('system', 'Exchange Monitor has started!')
}
