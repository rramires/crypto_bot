import Binance from 'node-binance-api'

const LOGS = process.env.BINANCE_LOGS === 'true'
const APIKEY = process.env.BINANCE_ACCESS_KEY
const APISECRET = process.env.BINANCE_SECRET_KEY

export class Exchange {
	constructor() {
		if (!APIKEY || !APISECRET) throw new Error('Binance keys not found!')

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
}
