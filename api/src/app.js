import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

const app = express()

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
app.use('/', (req, res) => {
	res.send('Hello from Express !')
})

export default app
