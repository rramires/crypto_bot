import express from 'express'
export const symbolsRouter = express.Router()

import { getSymbol, getSymbols } from '../controllers/symbols-controller.js'

symbolsRouter.get('/:symbol', getSymbol)
symbolsRouter.get('/', getSymbols)
