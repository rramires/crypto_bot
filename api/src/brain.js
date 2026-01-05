import { Cache } from './utils/cache.js'

export class Brain {
	static instance

	static getInstance(automations = []) {
		if (!Brain.instance) {
			Brain.instance = new Brain(automations)
		}
		return Brain.instance
	}

	constructor(automations) {
		// Init memory
		this.cache = new Cache()

		// TODO: Init the brain
	}

	async setCache(symbol, index, interval, value, execAutomations) {
		// TODO: Implement this
		return true
	}

	async updateTickerMemory(symbol, index, value, execAutomations = true) {
		this.setCache(symbol, index, null, value, execAutomations)
		return true
	}

	async updateMemory(symbol, index, interval, value, execAutomations = true) {
		if (value === undefined || value === null) {
			return false
		}
		// Simplifies if they toJSON.
		if (value.toJSON) {
			value = value.toJSON()
		}
		// Simplifies if they are Sequelize data.
		if (value.get) {
			value = value.get({ plain: true })
		}

		if (index === 'TICKER') {
			return this.updateTickerMemory(symbol, index, value, execAutomations)
		} else {
			return this.setCache(symbol, index, interval, value, execAutomations)
		}
	}
}
