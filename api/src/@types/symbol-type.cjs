const { DataTypes } = require('sequelize')

const symbolType = {
	symbol: {
		type: DataTypes.STRING(20),
		allowNull: false,
		primaryKey: true,
		comment: 'Trading Pair, ex: BTCUSDT',
	},
	base: {
		type: DataTypes.STRING(10),
		allowNull: false,
		comment: 'Base is 1st asset, ex BTC',
	},
	quote: {
		type: DataTypes.STRING(10),
		allowNull: false,
		comment: 'Base is 2nd asset, ex USDT',
	},
	stepSize: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Buy min size, ex: 0.1 BTC or 0.001 BTC etc',
	},
	tickSize: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Minimum increment price, ex: $0.01, $0.001 etc',
	},
	basePrecision: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: 'Base decimal places',
	},
	quotePrecision: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: 'Quote decimal places',
	},
	minNotional: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Min Price * Qty, ex: $10',
	},
	minLotSize: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Min Qty, ex: 0.00001 BTC',
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
}

module.exports = { symbolType }
