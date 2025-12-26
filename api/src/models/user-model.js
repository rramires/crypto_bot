import Sequelize from 'sequelize'

import { database } from '../db.js'

export const userType = {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: Sequelize.STRING(150),
	email: {
		type: Sequelize.STRING(150),
		allowNull: false,
	},
	password: {
		type: Sequelize.STRING(60),
		allowNull: false,
	},
	telegramChat: Sequelize.STRING(50),
	isActive: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
}

export const userModel = database.define('user', userType)
