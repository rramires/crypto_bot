import { symbolsModel } from '../models/symbols-model.js'

export function deleteAllSymbols() {
	return symbolsModel.destroy({ truncate: true })
}

export function bulkInsertSymbols(symbols) {
	return symbolsModel.bulkCreate(symbols)
}
