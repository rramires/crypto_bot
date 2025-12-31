import { NewOrderButton } from '../orders/new-order-button'
import { TemplatePage } from '../template-page'
import { CandleChart } from './candle-chart'
import { Ticker } from './Ticker/ticker'

export function Dashboard() {
	return (
		<TemplatePage>
			<div
				className='d-flex justify-content-between flex-wrap align-items-center py-2
			'
			>
				<div className='d-block mt-0'>
					<h1 className='h4'>Dashboard</h1>
				</div>
				<div className='btn-btn-toolbar mb-0'>
					<NewOrderButton />
				</div>
			</div>
			<CandleChart />
			<div className='row g-3 mt-2'>
				<div className='col-6'>
					<Ticker />
				</div>
				<div className='col-6'>{/* TODO: Wallet. */}</div>
			</div>
		</TemplatePage>
	)
}
