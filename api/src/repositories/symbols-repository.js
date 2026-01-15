import { where } from 'sequelize'

import { symbolModel } from '../models/symbol-model.js'

export function deleteAllSymbols() {
	return symbolModel.destroy({ truncate: true })
}

export function bulkInsertSymbols(symbols) {
	return symbolModel.bulkCreate(symbols)
}

export function getAllSymbols() {
	return symbolModel.findAll()
}

export function getOneSymbol(symbol) {
	return symbolModel.findOne({
		where: { symbol },
	})
}
