import { where } from 'sequelize'

import { symbolsModel } from '../models/symbols-model.js'

export function deleteAllSymbols() {
	return symbolsModel.destroy({ truncate: true })
}

export function bulkInsertSymbols(symbols) {
	return symbolsModel.bulkCreate(symbols)
}

export function getAllSymbols() {
	return symbolsModel.findAll()
}

export function getOneSymbol(symbol) {
	return symbolsModel.findOne({
		where: { symbol },
	})
}
