export class Cache {
	MEMORY = {}

	constructor() {
		this.MEMORY = {}
	}

	async get(key) {
		return this.MEMORY[key]
	}

	async set(key, value) {
		this.MEMORY[key] = value
	}

	async search(pattern) {
		if (!pattern) {
			return { ...this.MEMORY }
		}
		// TODO: Implement search with pattern
	}
}
