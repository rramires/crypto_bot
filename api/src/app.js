import express from 'express'

const app = express()

app.use('/', (req, res) => {
	res.send('Hello from Express !')
})

export default app
