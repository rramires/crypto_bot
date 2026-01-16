import express from 'express'
export const ordersRouter = express.Router()

import { getOrder, getOrders, placeOrder } from '../controllers/orders-controller.js'

ordersRouter.get('/:id', getOrder)
ordersRouter.get('/', getOrders)
ordersRouter.post('/', placeOrder)
