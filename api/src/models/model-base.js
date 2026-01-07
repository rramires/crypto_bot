import { createRequire } from 'module'

export function getType(typePath) {
	const require = createRequire(import.meta.url)
	return require(typePath)
}
