import axios from './base-service'
import { LIMIT_TYPES, ORDER_TYPES, STOP_TYPES } from './exchange-service'

const API_URL = import.meta.env.VITE_API_URL

export async function getOrders(page = 1) {
	const response = await axios.get(`${API_URL}/orders/?page=${page}`)

	return response.data //{ rows: [], count: x }
}

export async function getOrder(id) {
	const response = await axios.get(`${API_URL}/orders/${id}`)

	return response.data
}

export async function placeOrder(order) {
	const postOrder = {
		symbol: order.symbol.toUpperCase(),
		quantity: order.quantity,
		side: order.side.toUpperCase(),
		options: {
			type: order.type.toUpperCase(),
		},
	}

	if (postOrder.options.type === ORDER_TYPES.MARKET && order.isQuote) {
		postOrder.options.quoteOrderQty = order.quantity

		delete postOrder.quantity
	}

	if (LIMIT_TYPES.includes(postOrder.options.type)) {
		postOrder.limitPrice = order.limitPrice
	}

	if (STOP_TYPES.includes(postOrder.options.type)) {
		postOrder.options.stopPrice = order.stopPrice

		if (order.trailingDelta) {
			postOrder.options.trailingDelta = order.trailingDelta
		}
	}

	const response = await axios.post(`${API_URL}/orders`, postOrder)
	return response.data
}
