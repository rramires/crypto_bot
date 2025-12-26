import { userModel } from '../models/user-model.js'

export function getUserByEmail(email) {
	return userModel.findOne({ where: { email } })
}
