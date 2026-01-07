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
		/* const keys = Object.keys(this.MEMORY).filter(key => key.includes(pattern))
        const result = {}
        keys.forEach(key => {
            result[key] = this.MEMORY[key]
        })
        return result */
	}
}
