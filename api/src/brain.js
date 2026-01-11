import { Cache } from './utils/cache.js'
import { logger } from './utils/logger.js'

const LOGS = process.env.BRAIN_LOGS === 'true'

// Ticker Fields Docs
// https://github.com/ccxt/node-binance-api?tab=readme-ov-file#get-24hr-price-change-statistics-via-websocket

/* 
Hardcoded alternative for performance without loops in updateTickerMemory: 
ticker.priceChange = parseFloat(ticker.priceChange)
ticker.percentChange = parseFloat(ticker.percentChange)
ticker.averagePrice = parseFloat(ticker.averagePrice)
ticker.prevClose = parseFloat(ticker.prevClose)
ticker.close = parseFloat(ticker.close)
ticker.closeQty = parseFloat(ticker.closeQty)
ticker.bestBid = parseFloat(ticker.bestBid)
ticker.bestBidQty = parseFloat(ticker.bestBidQty)
ticker.bestAsk = parseFloat(ticker.bestAsk)
ticker.bestAskQty = parseFloat(ticker.bestAskQty)
ticker.open = parseFloat(ticker.open)
ticker.high = parseFloat(ticker.high)
ticker.low = parseFloat(ticker.low)
ticker.volume = parseFloat(ticker.volume)
ticker.quoteVolume = parseFloat(ticker.quoteVolume)

delete ticker.eventTime
delete ticker.eventType
delete ticker.lastTradeId
delete ticker.firstTradeId
delete ticker.numTrades
delete ticker.closeTime
delete ticker.openTime
delete ticker.symbol 
*/

const UNUSED_TICKER_FIELDS = [
	'eventTime',
	'eventType',
	'lastTradeId',
	'firstTradeId',
	'numTrades',
	'closeTime',
	'openTime',
	'symbol',
]

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

		this.BRAIN = {}
		// TODO: Init the brain with automations
	}

	async getBrain() {
		return { ...this.BRAIN }
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

		return { memoryKey, value }
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
		for (const key of UNUSED_TICKER_FIELDS) {
			delete ticker[key]
		}

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
