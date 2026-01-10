import { Brain } from './brain.js'
import { Exchange } from './utils/exchange.js'
import { logger } from './utils/logger.js'

let WSS

function startTickerMonitor(userId) {
	const exchange = new Exchange(userId)
	exchange.tickerStream(async (markets) => {
		try {
			const brain = Brain.getInstance()

			const results = await Promise.all(
				markets.map((mkt) => brain.updateMemory(mkt.symbol, 'TICKER', null, mkt)),
			)
			if (!results) {
				return
			}

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

async function loadWallet(userId, executeAutomations = true) {
	try {
		const exchange = new Exchange(userId)
		const brain = Brain.getInstance()

		const info = await exchange.balance()

		const results = await Promise.all(
			Object.keys(info).map((item) =>
				brain.updateMemory(
					item,
					`WALLET_${userId}`,
					null,
					info[item].available,
					executeAutomations,
				),
			),
		)
		if (results) {
			const validResults = results.filter(Boolean)
			if (validResults.length > 0) {
				validResults.forEach((res) => {
					WSS.broadcast({ notification: res })
				})
			}
			// for test
			// console.log('Saldo BTC:', await brain.getMemory('BTC', 'WALLET_1'))
		}

		const wallet = Object.keys(info).map((item) => {
			return { symbol: item, available: info[item].available, onOrder: info[item].onOrder }
		})
		// for test
		// console.log('wallet', wallet)
		return wallet
	} catch (err) {
		logger(
			`U-${userId}`,
			`Wallet has NOT loaded!\n ${err.body ? JSON.stringify(err.body) : err.message}`,
		)
	}
}

function proccessBalanceData(userId, data) {
	// TODO: Implement this
}

function proccessExecutionData(userId, data) {
	// TODO: Implement this
}

function userDataMonitor(userId) {
	try {
		loadWallet(userId, false)

		const exchange = new Exchange(userId)
		exchange.userDataStream(
			(data) => proccessBalanceData(userId, data),
			(data) => proccessExecutionData(userId, data),
		)

		logger(`U-${userId}`, 'User Data Monitor has started!')
	} catch (err) {
		logger(
			`U-${userId}`,
			`User Data Monitor has NOT started!\n ${err.body ? JSON.stringify(err.body) : err.message}`,
		)
	}
}

export async function emInit(userId, wssInstance) {
	WSS = wssInstance

	// Test broadcast messages with Postman. Connect to ws://localhost:3000?token=valid-JWT-token
	//setInterval(() => WSS.broadcast({ notification: { type: 'success', text: new Date() } }), 3000)

	// Market monitoring
	startTickerMonitor(userId)

	/// User data monitoring
	userDataMonitor(userId)

	// TODO: Load last executed orders

	// TODO: Assets monitoring (candles)

	logger('system', 'Exchange Monitor has started!')
}
