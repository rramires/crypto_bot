import { TemplatePage } from '../template-page'

export function Dashboard() {
	return (
		<TemplatePage>
			<div className='d-flex justify-content-between flex-wrap align-align-items-center py-4'>
				<div className='d-block mb-4'>
					<h1 className='h4'>Dashboard</h1>
				</div>
				<div className='btn-btn-toolbar mb-0'>
					{/* TODO: Symbols select and new manual order button. */}
				</div>
				{/* TODO: Candle chart. */}
				<div className='row'>
					<div className='col-6'>{/* TODO: 24h market. */}</div>
					<div className='col-6'>{/* TODO: Wallet. */}</div>
				</div>
			</div>
		</TemplatePage>
	)
}
