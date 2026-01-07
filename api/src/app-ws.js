import { WebSocket, WebSocketServer } from 'ws'

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

export function wsInit(server) {
	const wss = new WebSocketServer({
		server,
	})
	wss.on('connection', onConnection)
	wss.broadcast = broadcast

	logger('system', 'App WebSocket Server has started!')
	return wss
}
