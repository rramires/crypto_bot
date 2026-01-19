import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Pagination } from '../../components/pagination'
import { getOrders } from '../../services/orders-service'
import { OrderRow } from './order-row'

export function OrdersTable() {
	const location = useLocation()
	const page = new URLSearchParams(location.search).get('page') || '1'

	const [orders, setOrders] = useState([])
	const [count, setCount] = useState(0)
	const [message, setMessage] = useState('Loading orders...')

	useEffect(() => {
		getOrders(page)
			.then((result) => {
				setOrders(result.rows)
				setCount(result.count)
				setMessage('')
			})
			.catch((err) => {
				console.error(err.response ? err.response.data : err)
				setMessage(
					err.response
						? JSON.stringify(err.response.data)
						: err.message,
				)
			})
	}, [page])

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
							<td colSpan={6}>{message}</td>
						</tr>
					)}
				</tbody>
			</table>
			<Pagination count={count} />
		</div>
	)
}
