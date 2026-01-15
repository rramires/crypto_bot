import Binance from 'node-binance-api'

import { orderTypes } from '../repositories/orders-repository.js'
import { logger } from './logger.js'

const LOGS = process.env.BINANCE_LOGS === 'true'
const APIKEY = process.env.BINANCE_ACCESS_KEY
const APISECRET = process.env.BINANCE_SECRET_KEY

export class Exchange {
	constructor(userId) {
		if (!APIKEY || !APISECRET) {
			throw new Error('Binance keys not found!')
		}

		this.userId = userId

		this.binance = new Binance().options({
			APIKEY,
			APISECRET,
			family: 0,
			test: process.env.NODE_ENV !== 'production',
			verbose: LOGS,
		})
	}

	exchangeInfo() {
		return this.binance.exchangeInfo()
	}

	async balance() {
		this.binance.useServerTime()
		return this.binance.balance()
	}

	tickerStream(callback) {
		this.binance.websockets.prevDay(
			null,
			(data, converted) => {
				callback(converted)
			},
			true,
		)
	}

	userDataStream(balanceCallback, executionCallback) {
		this.binance.websockets.userData(
			() => {}, // catch all, not used
			balanceCallback,
			executionCallback,
			(data) => {
				logger(`U-${this.userId}`, `userDataStream:subscribed: ${JSON.stringify(data)}`)
				this.binance.options.listenKey = data
			},
			() => {}, // status update, not used
		)
	}

	buy(symbol, quantity, price, options) {
		if (!options || options.type === orderTypes.MARKET) {
			return this.binance.marketBuy(symbol, quantity, options)
		}

		return this.binance.buy(symbol, quantity, price, options)
	}

	sell(symbol, quantity, price, options) {
		if (!options || options.type === orderTypes.MARKET) {
			return this.binance.marketSell(symbol, quantity, options)
		}

		return this.binance.sell(symbol, quantity, price, options)
	}
}
