import axios from 'axios'

axios.interceptors.request.use(
	(config) => {
		config.headers.Authorization = localStorage.getItem('token')
		return config
	},
	(error) => Promise.reject(error),
)

axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			console.error('Redirected to login by 401 response!')

			if (window.location.pathname !== '/') {
				window.location.href = '/'
				return
			}
		}
		return Promise.reject(error.response ? error.response.data : error)
	},
)

export default axios
