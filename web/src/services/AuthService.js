//import axios from './BaseService'

export async function doLogin(email, password) {
	// mock login
	if (email === 'fulano@email.com' && password === 'abc123') {
		return {
			id: 1,
			token: 'tokenValue',
		}
	}
	throw new Error('401')
}

export async function doLogout() {
	return true
}
