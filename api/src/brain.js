import { Cache } from './utils/cache.js'
import { logger } from './utils/logger.js'

const LOGS = process.env.BRAIN_LOGS === 'true'

const TICKER_FIELDS = [
	'priceChange',
	'percentChange',
	'averagePrice',
	'prevClose',
	'close',
	'closeQty',
	'bestBid',
	'bestBidQty',
	'bestAsk',
	'bestAskQty',
	'open',
	'high',
	'low',
	'volume',
	'quoteVolume',
]

export class Brain {
	static instance

	static getInstance(automations = []) {
		if (!Brain.instance) {
			Brain.instance = new Brain(automations)
		}
		return Brain.instance
	}

	constructor(automations) {
		// Init memory
		this.cache = new Cache()

		// TODO: Init the brain
	}

	buildMemoryKey(symbol, index, interval = undefined) {
		const indexKey = interval ? `${index}_${interval}` : index
		return interval ? `${symbol}:${indexKey}` : index // BTCUSDT:TICKER, BTCUSDT:RSI_1m,
	}

	async setCache(symbol, index, interval, value, execAutomations) {
		const memoryKey = this.buildMemoryKey(symbol, index, interval)

		if (LOGS) {
			logger(
				'brain',
				`Memory updated: ${memoryKey} => ${typeof value === 'object' ? JSON.stringify(value) : value}`,
			)
		}

		this.cache.set(memoryKey, value)

		if (execAutomations) {
			// TODO: Add automations checks
		}
	}

	async getMemory(symbolOrKey, index = undefined, interval = undefined) {
		if (symbolOrKey && index) {
			const memoryKey = this.buildMemoryKey(symbolOrKey, index, interval)
			return this.cache.get(memoryKey)
		} else if (symbolOrKey) {
			return this.cache.get(symbolOrKey)
		} else {
			return this.cache.getAll()
		}
	}

	async updateTickerMemory(symbol, index, ticker, execAutomations = true) {
		for (const key of TICKER_FIELDS) {
			ticker[key] = parseFloat(ticker[key])
		}

		const currentMemory = await this.getMemory(symbol, index)

		// Stores the previous and the new values.
		const newMemoryItem = {
			previous: currentMemory?.current ?? ticker,
			current: ticker,
		}
		/* const newMemoryItem = {}
		newMemoryItem.previous = currentMemory ? currentMemory.current : ticker
		newMemoryItem.current = ticker */

		this.setCache(symbol, index, null, newMemoryItem, execAutomations)
	}

	async updateMemory(symbol, index, interval, value, execAutomations = true) {
		if (value === undefined || value === null) {
			return false
		}
		// Simplifies if they toJSON.
		if (value.toJSON) {
			value = value.toJSON()
		}
		// Simplifies if they are Sequelize data.
		if (value.get) {
			value = value.get({ plain: true })
		}

		if (index === 'TICKER') {
			return this.updateTickerMemory(symbol, index, value, execAutomations)
		} else {
			return this.setCache(symbol, index, interval, value, execAutomations)
		}
	}
}
