import { useState } from 'react'
import useWebSocket from 'react-use-websocket'

import { TickerRow } from './ticker-row'

const TOP_COINS = [
	'BTCUSDT',
	'ETHUSDT',
	'SOLUSDT',
	'LTCUSDT',
	'ETHBTC',
	'SOLBTC',
	'LTCBTC',
]

export function Ticker() {
	const [ticker, setTicker] = useState({})

	/* 
	Streams/queryParams: 
	btcusdt@ticker/ethusdt@ticker/solusdt@ticker...
	*/
	const streams = TOP_COINS.map(
		(coin) => `${coin.toLocaleLowerCase()}@ticker`,
	).join('/')

	/* 
	Payload docs: 
	https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#individual-symbol-ticker-streams 
	*/
	useWebSocket(`${import.meta.env.VITE_BWS_URL}/stream`, {
		onOpen: () => console.log('Connected to Binance WebSocket'),
		onMessage: (message) => {
			if (!message) {
				return
			}

			const jsonObj = JSON.parse(message.data)

			setTicker((prevState) => ({
				...prevState,
				[jsonObj.data.s]: jsonObj.data, // s = symbol, data
			}))
		},
		queryParams: { streams },
		onError: (error) => {
			console.error(error)
		},
		reconnectInterval: 60000, // In ms = 1min
	})

	return (
		<>
			<div className='col-12'>
				<div className='card border-0 shadow'>
					<div className='card-header'>
						<div className='row'>
							<div className='col'>
								<h2 className='fs-5 fw-bold mb-0'>
									Market 24h
								</h2>
							</div>
						</div>
					</div>
					<div className='table-responsive divScroll'>
						<table className='table align-items-center table-flush table-sm table-hover tableFixHead'>
							<thead className='thead-light'>
								<tr>
									<th className='border-bottom' scope='col'>
										SYMBOL
									</th>
									<th
										className='border-bottom col-2'
										scope='col'
									>
										Price Now
									</th>
									<th
										className='border-bottom col-2'
										scope='col'
									>
										Yesterday
									</th>
									<th
										className='border-bottom col-2'
										scope='col'
									>
										High
									</th>
									<th
										className='border-bottom col-2'
										scope='col'
									>
										Low
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Infos: close, open, high, low */}
								{TOP_COINS.map((item) => (
									<TickerRow
										key={item}
										symbol={item}
										data={ticker[item]}
									/>
								))}
							</tbody>
						</table>
					</div>
					<div className='m-3 mt-3 ms-4'>
						Summary from last 24h to now: Close, Open, High and Low
					</div>
				</div>
			</div>
		</>
	)
}
