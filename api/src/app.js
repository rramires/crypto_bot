import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { doLogin, doLogout } from './controllers/auth-controller.js'
import { authMiddleware } from './middlewares/auth-middleware.js'
import { errorMiddleware } from './middlewares/error-middelware.js'

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
app.use('/exchange', authMiddleware, (req, res) => {
	res.send('Exchange area!')
})

// error
app.use(errorMiddleware)

// default
app.use('/', (req, res) => {
	res.send('Hello from Express !')
})
