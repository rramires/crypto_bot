export function doLogin(req, res) {
	const { email, password } = req.body

	if (email === 'fulano@email.com' && password === 'abc123') {
		return res.json({
			id: 1,
			token: 'token',
		})
	}

	res.sendStatus(401)
}

export function doLogout(req, res) {
	res.send('Logout')
}
