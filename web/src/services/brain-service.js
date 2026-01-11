import axios from './base-service'

const API_URL = import.meta.env.VITE_API_URL

export async function getBrain() {
	const url = `${API_URL}/brain`
	const response = await axios.get(url)
	return response.data
}

export async function getMemory() {
	const url = `${API_URL}/brain/memory`
	const response = await axios.get(url)
	return response.data
}
