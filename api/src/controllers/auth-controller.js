import bcrypt from 'bcryptjs'

import { getUserByEmail } from '../repositories/user-repository.js'
import { generateToken } from '../utils/auth-service.js'
import { addToBlacklist } from '../utils/blacklist.js'

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

	const token = await generateToken(user.id)

	return res.json({
		id: user.id,
		token,
	})
}

export async function doLogout(req, res) {
	const token = req.headers['authorization']

	addToBlacklist(token)

	res.sendStatus(200)
}
