import { useState } from 'react'

import { WalletRow } from './wallet-row'

export function Wallet() {
	const [fiat, setFiat] = useState('~USD 100.00')
	const [balances, setBalances] = useState([
		{
			symbol: 'BTC',
			available: '0.001',
			onOrder: '0.0005',
		},
		{
			symbol: 'ETH',
			available: '0.5',
			onOrder: '0.25',
		},
		{
			symbol: 'SOL',
			available: '10',
			onOrder: '0',
		},
	])

	return (
		<>
			<div className='col-12'>
				<div className='card border-0 shadow'>
					<div className='card-header'>
						<div className='row'>
							<div className='col'>
								<h2 className='fs-5 fw-bold mb-0'>Wallet</h2>
							</div>
						</div>
					</div>
					<div className='table-responsive divScroll'>
						<table className='table align-items-center table-flush table-sm table-hover tableFixHead'>
							<thead className='thead-light'>
								<tr>
									<th className='border-bottom' scope='col'>
										COIN
									</th>
									<th
										className='border-bottom col-3'
										scope='col'
									>
										Free
									</th>
									<th
										className='border-bottom col-3'
										scope='col'
									>
										Locked
									</th>
									{/* <th
										className='border-bottom col-2'
										scope='col'
									>
										Total
									</th> */}
								</tr>
							</thead>
							<tbody>
								{balances &&
									balances.length &&
									balances.map((item) => (
										<WalletRow
											key={item}
											symbol={item.symbol}
											available={item.available}
											onOrder={item.onOrder}
										/>
									))}
							</tbody>
						</table>
					</div>
					<div className='m-3 mt-3 me-4 text-end'>
						Estimate: <b>{fiat}</b>
					</div>
				</div>
			</div>
		</>
	)
}
