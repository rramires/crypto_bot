import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

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

// routes
app.use('/login', (req, res) => {
	//res.send('Login !')
})

app.use('/logout', (req, res) => {
	res.send('Logout !')
})

// error
app.use(errorMiddleware)

// root
app.use('/', (req, res) => {
	res.send('Hello from Express !')
})
