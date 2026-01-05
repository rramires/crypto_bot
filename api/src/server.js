import { app } from './app.js'
import { emInit } from './app-em.js'
import { database } from './db.js'
import { getActiveUsers } from './repositories/user-repository.js'
import { logger } from './utils/logger.js'

async function start() {
	logger('system', 'Your Node version is: ' + process.version)

	logger('system', 'Initializing Brain: ')
	// TODO: Add Brain Start

	const users = await getActiveUsers()
	if (!users || !users.length) {
		logger('system', 'No active users found!')
		return
	}

	logger('system', 'Starting express server')
	app.listen(process.env.PORT, () => {
		console.log(`Express app is listening at ${process.env.PORT} port.`)
	})

	// Exchange Monitor init
	emInit(users[0].id)
}
start()
