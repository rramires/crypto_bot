import { bulkInsertSymbols, deleteAllSymbols } from '../repositories/symbols-repository.js'
import { Exchange } from '../utils/exchange.js'

export async function syncSymbols() {
	const useBlvt = process.env.BINANCE_BLVT === 'true'
	const ignoredCoins = (process.env.BINANCE_IGNORED_COINS || '').split(',')

	const onlyPairsWith = (process.env.BINANCE_ONLY_PAIRS_WITH || '').split(',')

	const exchange = new Exchange()

	const data = await exchange.exchangeInfo()
	// console.log(JSON.stringify(data.symbols))
	// map only symbols in https://api.binance.com/api/v3/exchangeInfo
	const symbols = data.symbols
		.map((item) => {
			// skips
			if (!useBlvt && (item.baseAsset.endsWith('UP') || item.baseAsset.endsWith('DOWN'))) {
				return false
			}
			if (
				(ignoredCoins &&
					ignoredCoins.length > 0 &&
					ignoredCoins.includes(item.baseAsset)) ||
				ignoredCoins.includes(item.quoteAsset)
			) {
				return false
			}
			if (
				onlyPairsWith &&
				onlyPairsWith.length > 0 &&
				!onlyPairsWith.includes(item.baseAsset) &&
				!onlyPairsWith.includes(item.quoteAsset)
			) {
				return false
			}

			// filters
			const notionalFilter = item.filters.find((f) => f.filterType === 'NOTIONAL')
			const lotSizeFilter = item.filters.find((f) => f.filterType === 'LOT_SIZE')
			const priceFilter = item.filters.find((f) => f.filterType === 'PRICE_FILTER')

			return {
				symbol: item.symbol,
				basePrecision: item.baseAssetPrecision,
				quotePrecision: item.quoteAssetPrecision,
				base: item.baseAsset,
				quote: item.quoteAsset,
				minNotional: notionalFilter ? notionalFilter.minNotional : '1',
				minLotSize: lotSizeFilter ? lotSizeFilter.minQty : '1',
				stepSize: lotSizeFilter ? lotSizeFilter.stepSize : '1',
				tickSize: priceFilter ? priceFilter.tickSize : '1',
			}
		})
		.filter(Boolean) // exclude skips

	//console.log(JSON.stringify(symbols))

	await deleteAllSymbols()

	await bulkInsertSymbols(symbols)
}
