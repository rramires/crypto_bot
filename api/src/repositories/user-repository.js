import { where } from 'sequelize'

import { userModel } from '../models/user-model.js'

export function getUserByEmail(email) {
	return userModel.findOne({ where: { email } })
}

export function getActiveUsers() {
	return userModel.findAll({
		where: { isActive: true },
		include: [{ all: true, nested: true }],
	})
}
