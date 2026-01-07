const blacklist = {}

export function addToBlacklist(token) {
	if (!token) return

	blacklist[token] = true

	setTimeout(
		() => {
			delete blacklist[token]
		},
		parseInt(process.env.JWT_EXPIRES) * 1000,
	)
}

export function isBlacklisted(token) {
	return Boolean(blacklist[token])
}
