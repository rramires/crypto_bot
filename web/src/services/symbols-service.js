import axios from './base-service'

const API_URL = import.meta.env.VITE_API_URL

export async function getAllSymbols() {
	const url = `${API_URL}/symbols`

	const response = await axios.get(url)

	return response.data
}

export async function getSymbol(symbol) {
	const url = `${API_URL}/symbols/${symbol}`

	const response = await axios.get(url)

	return response.data
}
