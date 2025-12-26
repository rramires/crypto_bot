import { userModel } from '../models/userModel.js'

export function getUserByEmail(email) {
	return userModel.findOne({ where: { email } })
}
