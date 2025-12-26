import Binance from 'node-binance-api'

export class Exchange {
	constructor() {
		this.binance = new Binance().options({
			family: 0,
			test: process.env.NODE_ENV !== 'production',
			verbose: process.env.NODE_ENV === 'true',
		})
	}

	exchangeInfo() {
		return this.binance.exchangeInfo()
	}
}
