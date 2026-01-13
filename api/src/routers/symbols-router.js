import express from 'express'
export const symbolsRouter = express.Router()

import { getSymbols } from '../controllers/symbols-controller.js'

symbolsRouter.get('/', getSymbols)
