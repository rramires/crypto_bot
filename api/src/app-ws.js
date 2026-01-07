import jwt from 'jsonwebtoken'
import { WebSocket, WebSocketServer } from 'ws'

import { isBlackList } from './controllers/auth-controller.js'
import { logger } from './utils/logger.js'

function onMessage(data) {
	logger('system', `app-ws.onMessage: ${data}`)
}

function onError(err) {
	logger('system', `app-ws.onError: ${err.message}`)
}

function onConnection(ws, req) {
	ws.on('message', onMessage)
	ws.on('error', onError)
	logger('system', `app-ws.onConnection`)
}

function broadcast(data) {
	if (!this.clients) {
		return
	}

	this.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(data))
		}
	})
}

const CORS_ORIGIN = process.env.CORS_ORIGIN
function corsValidation(origin) {
	//console.log('origin', origin, CORS_ORIGIN, origin === CORS_ORIGIN)
	return origin === CORS_ORIGIN || origin === '*'
}

async function verifyClient(info, callback) {
	// CORS
	if (!corsValidation(info.origin)) {
		return callback(false, 401)
	}
	// JWT
	const token = info.req.url.split('token=')[1]

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			if (decoded) {
				// Blacklist
				const isBlackListed = await isBlackList(token)
				if (!isBlackListed) {
					return callback(true)
				}
			}
		} catch (err) {
			logger('system', err)
		}
	}
	return callback(false, 401)
}

export function wsInit(server) {
	const wss = new WebSocketServer({
		server,
		verifyClient,
	})
	wss.on('connection', onConnection)
	wss.broadcast = broadcast

	logger('system', 'App WebSocket Server has started!')
	return wss
}
