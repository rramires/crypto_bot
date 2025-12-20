import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/dashboard'
import { Login } from './pages/login'

function PrivateRoute({ children }) {
	const isAuth = localStorage.getItem('token')
	return isAuth ? children : <Navigate to='/' replace />
}

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route
					path='/dashboard'
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
