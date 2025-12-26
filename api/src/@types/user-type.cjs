const { DataTypes } = require('sequelize')

const userType = {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: DataTypes.STRING(150),
	email: {
		type: DataTypes.STRING(150),
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(60),
		allowNull: false,
	},
	telegramChat: DataTypes.STRING(50),
	isActive: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
}

module.exports = { userType }
