import {
	getOrderById,
	getOrdersByUserId,
	insertOrder,
	orderSide,
	orderStatus,
	orderTypes,
} from '../repositories/orders-repository.js'
import { Exchange } from '../utils/exchange.js'
import { logger } from '../utils/logger.js'

export async function getOrder(req, res) {
	const userId = res.locals.token.id
	const id = req.params.id

	const order = await getOrderById(id, userId)
	if (!order) {
		return res.sendStatus(404)
	}

	res.json(order)
}

export async function getOrders(req, res) {
	const userId = res.locals.token.id
	const page = parseInt(req.query.page || 1)

	const orders = await getOrdersByUserId(userId, page)

	res.json(orders) // { rows: [], count: x }
}

export async function placeOrder(req, res) {
	const userId = res.locals.token.id
	const { side, symbol, quantity, limitPrice, options } = req.body

	const exchange = new Exchange(userId)

	try {
		// place
		let result
		if (side === orderSide.BUY) {
			result = await exchange.buy(symbol, quantity, limitPrice, options)
		} else if (side === orderSide.SELL) {
			result = await exchange.sell(symbol, quantity, limitPrice, options)
		} else {
			return res.sendStatus(400)
		}

		if (result.code !== undefined && result.code < 0) {
			throw new Error(result.msg)
		}

		// if OK, insert in DB
		const order = await insertOrder({
			userId,
			symbol,
			quantity: options && options.quoteOrderQty ? '' : quantity,
			type: options ? options.type : orderTypes.MARKET,
			side,
			limitPrice,
			stopPrice: options ? options.stopPrice : null,
			trailingDelta: options ? options.trailingDelta : null,
			orderId: result.orderId,
			transactTime: result.transactTime || result.updateTime,
			status: result.status || orderStatus.NEW,
		})

		res.status(201).json(order.get({ plain: true }))
	} catch (err) {
		logger(`U-${userId}`, err.body ? JSON.stringify(err.body) : err.message)

		return res.status(400).json(err.body ? err.body : err.message)
	}
}
