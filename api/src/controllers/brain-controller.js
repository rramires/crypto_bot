import { Brain } from '../brain.js'

export async function getBrain(req, res) {
	const brain = await Brain.getInstance().getBrain()
	res.json(brain)
}

export async function getBrainMemory(req, res) {
	const memory = await Brain.getInstance().getMemory()
	res.json(memory)
}

export async function updateBrainMemory(req, res) {
	const memoryKey = req.params.index // BTCUSDT:INDEX
	const [symbol, idx] = memoryKey.split(':') // ['BTCUSDT', 'INDEX']

	const index = idx.split('_')[0] // BTCUSDT:CANDLES_1h, BTCUSDT:RSI_1h
	const interval = index.split('_')[1] // ex: 1h or undefined

	const value = req.body.data

	let results = await Brain.getInstance().updateMemory(symbol, index, interval, value, true)

	if (results && results.length) {
		results = results.filter(Boolean)
	}
	res.json(results)
}
