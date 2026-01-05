export class Cache {
	MEMORY = {}

	constructor() {
		this.MEMORY = {}
	}

	async get(key) {
		this.MEMORY[key]
	}

	async set(key, value) {
		this.MEMORY[key] = value
	}
}
