const { DataTypes } = require('sequelize')

const orderType = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
		comment: 'Primary key',
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		comment: 'Foreign key for users table',
		references: {
			model: 'users',
			key: 'id',
		},
	},
	automationId: {
		type: DataTypes.INTEGER,
		comment: 'Foreign key for automations table (not implemented yet)',
	},
	symbol: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Trading Pair, ex: BTCUSDT',
	},
	orderId: {
		type: DataTypes.BIGINT,
		allowNull: false,
		comment: 'Order identifier on the exchange',
	},
	transactTime: {
		type: DataTypes.BIGINT,
		allowNull: false,
		comment: 'Order execution timestamp on the exchange.',
	},
	type: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'LIMIT, MARKET, etc',
	},
	side: {
		type: DataTypes.STRING(4),
		allowNull: false,
		comment: 'BUY or SELL',
	},
	status: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Order executed, canceled, etc.',
	},
	quantity: {
		type: DataTypes.STRING(20),
		allowNull: false,
		comment: 'Order quantity',
	},
	limitPrice: {
		type: DataTypes.STRING(20),
		comment: 'For limit orders',
	},
	stopPrice: {
		type: DataTypes.STRING(20),
		comment: 'For stop orders',
	},
	trailingDelta: {
		type: DataTypes.INTEGER,
		comment: 'For trailing stop orders',
	},
	avgPrice: {
		type: DataTypes.DECIMAL(18, 8),
		comment: 'Average price of the transaction',
	},
	commission: {
		type: DataTypes.STRING,
		comment: 'Exchange commission',
	},
	net: {
		type: DataTypes.DECIMAL(18, 8),
		comment: 'Net value with commission deduction',
	},
	obs: {
		type: DataTypes.STRING,
		comment: 'Notes on the transaction',
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
}

module.exports = { orderType }
