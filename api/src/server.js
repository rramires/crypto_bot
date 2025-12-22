import { app } from './app.js'
import { logger } from './utils/logger.js'

async function start() {
	logger('system', 'Your Node version is: ' + process.version)

	logger('system', 'Initializing Brain: ')
	// TODO: Add Brain Start

	logger('system', 'No active users found!')
	// TODO: Check active users

	logger('system', 'Starting express server')
	app.listen(process.env.PORT, () => {
		console.log(`Express app is listening at ${process.env.PORT} port.`)
	})
}
start()
