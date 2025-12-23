import jwt from 'jsonwebtoken'

export function doLogin(req, res) {
	const { email, password } = req.body

	if (email === 'fulano@email.com' && password === 'abc123') {
		//
		const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, {
			expiresIn: parseInt(process.env.JWT_EXPIRES),
		})

		return res.json({
			id: 1,
			token,
		})
	}

	res.sendStatus(401)
}

const blacklist = {}

export function doLogout(req, res) {
	const token = req.headers['authorization']

	blacklist[token] = true
	setTimeout(() => (blacklist[token] = undefined), parseInt(process.env.JWT_EXPIRES) * 1000)

	res.sendStatus(200)
}

export function isBlackList(token) {
	return blacklist[token]
}
