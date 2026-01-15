import { database } from '../db.js'
import { getType } from './model-base.js'

const { orderType } = getType('../@types/order-type.cjs')

export const orderModel = database.define('orders', orderType)
