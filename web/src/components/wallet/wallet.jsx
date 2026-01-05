import { useEffect, useState } from 'react'

import { getBalance } from '../../services/exchange-service'
import { WalletRow } from './wallet-row'

export function Wallet() {
	const [fiat, setFiat] = useState('~USD 100.00')
	const [balances, setBalances] = useState([])

	useEffect(() => {
		getBalance()
			.then((info) => {
				/* info 
				{
					"BTC": {
						"available": "1.00000000",
						"onOrder": "0.00000000"
				},
				"fiatEstimate": "~USD 100"
				} */
				const balances = Object.entries(info)
					.map((item) => {
						return {
							symbol: item[0],
							available: item[1].available,
							onOrder: item[1].onOrder,
						}
					})
					.sort((a, b) => {
						if (a.symbol > b.symbol) {
							return 1
						}
						if (a.symbol < b.symbol) {
							return -1
						}
						return 0
					})

				setBalances(balances)
				setFiat(info.fiatEstimate)
			})
			.catch((err) => {
				console.error(err.response ? err.response.data : err)
			})
	}, [])

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
