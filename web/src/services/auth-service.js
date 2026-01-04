import axios from './base-service'

const API_URL = import.meta.env.VITE_API_URL

export async function doLogin(email, password) {
	const url = `${API_URL}/login`

	const response = await axios.post(url, { email, password })

	return response.data
}

export async function doLogout() {
	const url = `${API_URL}/logout`

	const response = await axios.post(url)

	return response.data
}
