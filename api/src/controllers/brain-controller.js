import { Brain } from '../brain.js'

export async function getBrain(req, res) {
	const brain = await Brain.getInstance().getBrain()
	res.json(brain)
}

export async function getBrainMemory(req, res) {
	const memory = await Brain.getInstance().getMemory()
	res.json(memory)
}
