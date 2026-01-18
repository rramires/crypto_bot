import { useEffect, useState } from 'react'

import { getOrders } from '../../services/orders-service'
import { OrderRow } from './order-row'

export function OrdersTable() {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		getOrders()
			.then((result) => {
				setOrders(result.rows)
			})
			.catch((err) => console.error(err))
	}, [])

	return (
		<div className='card card-body border-0 shadow table-wrapper table-responsive'>
			<table className='table table-hover'>
				<thead>
					<tr>
						<th className='border-gray-200'>Order</th>
						<th className='border-gray-200'>Date</th>
						<th className='border-gray-200'>Qty</th>
						<th className='border-gray-200'>Net</th>
						<th className='border-gray-200'>Status</th>
						<th className='border-gray-200'>View</th>
					</tr>
				</thead>
				<tbody>
					{orders ? (
						orders.map((order) => (
							<OrderRow key={order.id} data={order} />
						))
					) : (
						<tr>
							<td colSpan={6}>No orders found.</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
