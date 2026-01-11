import { Brain } from './brain.js'
import { getSymbols } from './repositories/symbols-repository.js'
import { Exchange } from './utils/exchange.js'
import { logger } from './utils/logger.js'

let WSS
const LOGS = process.env.APP_EM_LOGS === 'true'

async function startTickerMonitor(userId) {
	const symbolsMap = {}
	const symbolsArray = await getSymbols()
	symbolsArray.map((symbolObj) => (symbolsMap[symbolObj.symbol] = true))

	const exchange = new Exchange(userId)
	exchange.tickerStream(async (markets) => {
		try {
			const brain = Brain.getInstance()

			const results = await Promise.all(
				markets.map(async (mkt) => {
					// skip if not found in database symbols
					if (!symbolsMap[mkt.symbol]) {
						return false
					}
					return await brain.updateMemory(mkt.symbol, 'TICKER', null, mkt)
				}),
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
			Object.keys(info).map(async (item) => {
				if (executeAutomations) {
					// skip if the values are identical
					const memory = await brain.getMemory(item, `WALLET_${userId}`)
					if (memory === info[item].available) {
						return
					}
				}
				return await brain.updateMemory(
					item,
					`WALLET_${userId}`,
					null,
					parseFloat(info[item].available),
					executeAutomations,
				)
			}),
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

async function proccessBalanceData(userId, data) {
	if (LOGS) {
		logger(`U-${userId}->proccessBalanceData:`, `${JSON.stringify(data)}`)
	}
	// reload wallet with automations
	await loadWallet(userId, true)
}

async function proccessExecutionData(userId, data) {
	// Docs:
	// https://github.com/binance/binance-spot-api-docs/blob/master/user-data-stream.md#order-update

	// skip NEW orders
	if (data.x === 'NEW') {
		return
	}

	if (LOGS) {
		logger(`U-${userId}->proccessExecutionData:`, `${JSON.stringify(data)}`)
	}

	const order = {
		symbol: data.s, // Symbol
		orderId: data.i, // Order ID
		side: data.S, // Side BUY, SELL
		type: data.o, // Order type LIMIT, MARKET
		status: data.X, // Current order status
		transactTime: data.T, // Transaction time
	}

	// Only the fully executed order matters.
	if (order.status === 'FILLED') {
		const quoteAmount = parseFloat(data.Z) // Cumulative quote asset transacted quantity
		order.avgPrice = quoteAmount / parseFloat(data.z) // Cumulative filled quantity
		order.commission = data.n // Commission amount
		order.quantity = data.q // Order quantity
		const isQuoteCommission = data.N && order.symbol.endsWith(data.N) // Commission asset
		order.net = isQuoteCommission ? quoteAmount - parseFloat(order.commission) : quoteAmount // net value
	} else if (order.status === 'REJECTED') {
		order.obs = data.r // Order reject reason
	}
	// TODO: Implement order update
}

async function userDataMonitor(userId) {
	try {
		await loadWallet(userId, false)

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
	await userDataMonitor(userId)

	// TODO: Load last executed orders

	// TODO: Assets monitoring (candles)

	logger('system', 'Exchange Monitor has started!')
}
