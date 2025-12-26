import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { getUserByEmail } from '../repositories/userRepository.js'

export async function doLogin(req, res) {
	const { email, password } = req.body

	const user = await getUserByEmail(email)
	if (!user || !user.isActive) {
		return res.sendStatus(401)
	}

	const isValid = bcrypt.compareSync(password, user.password)
	if (!isValid) {
		return res.sendStatus(401)
	}

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: parseInt(process.env.JWT_EXPIRES),
	})

	return res.json({
		id: user.id,
		token,
	})
}

const blacklist = {}

export async function doLogout(req, res) {
	const token = req.headers['authorization']

	blacklist[token] = true
	setTimeout(() => (blacklist[token] = undefined), parseInt(process.env.JWT_EXPIRES) * 1000)

	res.sendStatus(200)
}

export function isBlackList(token) {
	return blacklist[token]
}
