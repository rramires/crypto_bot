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

const FIAT_COINS = ['BRL', 'EUR', 'GBP']

const DOLLAR_COINS = [
	'USD',
	'USDT',
	'USDC',
	'DAI',
	'PYUSD',
	'USD1',
	'USDG',
	'RLUSD',
	'USDD',
	'FDUSD',
	'TUSD',
	'USDP',
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

	async getFiatConversion(stablecoin, fiatCoin, fiatQty) {
		const ticker = await this.getMemory(stablecoin + fiatCoin, 'TICKER')
		if (ticker && ticker.current) {
			return parseFloat(fiatQty) / ticker.current.close
		}

		return 0
	}

	async getStableConversion(baseAsset, quoteAsset, baseQty) {
		if (DOLLAR_COINS.includes(baseAsset)) {
			return baseQty
		}

		const ticker = await this.getMemory(baseAsset + quoteAsset, 'TICKER')
		if (ticker && ticker.current) {
			return parseFloat(baseQty) * ticker.current.close
		}

		return 0
	}

	async tryUsdConversion(baseAsset, baseQty) {
		// baseAsset is dollarized
		if (DOLLAR_COINS.includes(baseAsset)) {
			return baseQty
		}
		// baseAsset is fiat
		if (FIAT_COINS.includes(baseAsset)) {
			return await this.getFiatConversion('USDT', baseAsset, baseQty)
		}
		// baseAsset is cryptocurrency
		for (const key of DOLLAR_COINS) {
			const converted = await this.getStableConversion(baseAsset, key, baseQty)
			if (converted > 0) {
				return converted
			}
		}
		return 0
	}

	async tryFiatConversion(baseAsset, baseQty, fiat) {
		if (fiat) {
			fiat = fiat.toUpperCase()
		}
		if (FIAT_COINS.includes(baseAsset) && baseAsset === fiat) {
			return baseQty
		}

		// Conversion to dollars
		const usd = await this.tryUsdConversion(baseAsset, baseQty)
		if (fiat === 'USD' || !fiat) {
			return usd
		}

		// Conversion to other FIATs
		let ticker = await this.getMemory('USDT' + fiat, 'TICKER')
		if (ticker && ticker.current) {
			return usd * ticker.current.close
		}
		ticker = await this.getMemory(fiat + 'USDT', 'TICKER')
		if (ticker && ticker.current) {
			return usd / ticker.current.close
		}

		// If not possible, returns in dollar
		return usd
	}

	buildMemoryKey(symbol, index, interval = undefined) {
		const indexKey = interval ? `${index}_${interval}` : index
		return `${symbol}:${indexKey}` // BTCUSDT:TICKER, BTCUSDT:RSI_1m,
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
			return this.cache.search()
		}
	}

	async getMemoryFromKey(keyPattern) {
		return this.cache.search(keyPattern)
	}

	async updateTickerMemory(symbol, index, ticker, execAutomations = true) {
		for (const key of TICKER_FIELDS) {
			ticker[key] = parseFloat(ticker[key])
		}

		const currentMemory = await this.getMemory(symbol, index)

		// Stores the previous and the new values.
		const newMemoryItem = {
			previous: currentMemory ? currentMemory.current : ticker,
			current: ticker,
		}

		return this.setCache(symbol, index, null, newMemoryItem, execAutomations)
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
