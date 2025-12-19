import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/dashboard'
import { Login } from './pages/login'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	)
}
