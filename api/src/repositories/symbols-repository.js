import { symbolsModel } from '../models/symbols-model.js'

export function deleteAll() {
	return symbolsModel.destroy({ truncate: true })
}

export function bulkInsert(symbols) {
	return symbolsModel.bulkCreate(symbols)
}
