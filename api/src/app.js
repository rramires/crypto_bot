import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { doLogin, doLogout } from './controllers/auth-controller.js'
import { getBalance } from './controllers/exchange-controller.js'
import { authMiddleware } from './middlewares/auth-middleware.js'
import { errorMiddleware } from './middlewares/error-middelware.js'
import { brainRouter } from './routers/brain-router.js'
import { symbolsRouter } from './routers/symbols-router.js'

export const app = express()

// utils
app.use(helmet())
app.use(express.json())
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	}),
)
app.use(morgan('dev'))

// public routes
app.post('/login', doLogin)
app.post('/logout', doLogout)

// private routes
app.use('/exchange/balance', authMiddleware, getBalance)
app.use('/brain', authMiddleware, brainRouter)
app.use('/symbols', authMiddleware, symbolsRouter)

// error
app.use(errorMiddleware)

// default
app.use('/', (req, res) => {
	res.send('Hello from Express !')
})
