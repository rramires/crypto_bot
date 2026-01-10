import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Automations } from './pages/automations/automations'
import { Brain } from './pages/brain/brain'
import { Dashboard } from './pages/dashboard/dashboard'
import { Login } from './pages/login'
import { Monitors } from './pages/monitors/monitors'
import { Orders } from './pages/orders/orders'
import { OrderTemplates } from './pages/ordertemplates/order-templates'
import { Reports } from './pages/reports/reports'

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
				<Route
					path='/brain'
					element={
						<PrivateRoute>
							<Brain />
						</PrivateRoute>
					}
				/>
				<Route
					path='/reports'
					element={
						<PrivateRoute>
							<Reports />
						</PrivateRoute>
					}
				/>
				<Route
					path='/orders'
					element={
						<PrivateRoute>
							<Orders />
						</PrivateRoute>
					}
				/>
				<Route
					path='/automations'
					element={
						<PrivateRoute>
							<Automations />
						</PrivateRoute>
					}
				/>
				<Route
					path='/ordertemplates'
					element={
						<PrivateRoute>
							<OrderTemplates />
						</PrivateRoute>
					}
				/>
				<Route
					path='/monitors'
					element={
						<PrivateRoute>
							<Monitors />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
