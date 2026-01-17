import { ListPage } from '../list-page'
import { NewOrderButton } from './new-order-button'
import { OrdersTable } from './orders-table'

export function Orders() {
	return (
		<ListPage
			title='Orders'
			button={<NewOrderButton />}
			table={<OrdersTable />}
		/>
	)
}
