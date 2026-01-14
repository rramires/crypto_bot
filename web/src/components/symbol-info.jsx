import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'

import { getSymbol } from '../services/symbols-service'

export function SymbolInfo({ symbol }) {
	const [info, setInfo] = useState({
		yesterday: 0,
		now: 0,
		minNotional: 0,
		minLotSize: 0,
	})

	useEffect(() => {
		if (!symbol) {
			return
		}
		getSymbol(symbol)
			.then((symbolObj) =>
				setInfo((prevState) => ({
					...prevState,
					minLotSize: symbolObj.minLotSize,
					minNotional: symbolObj.minNotional,
				})),
			)
			.catch((err) =>
				console.error(err.response ? err.response.data : err.message),
			)
	}, [symbol])

	function getWebStreamUrl() {
		if (!symbol) {
			return ''
		}
		return `${import.meta.env.VITE_BWS_URL}/ws/${symbol.toLowerCase()}@ticker`
	}

	const { lastJsonMessage } = useWebSocket(getWebStreamUrl(), {
		onOpen: () =>
			console.log(`Connected to Binance Stream: ${symbol}@ticker`),
		onMessage: () => {
			if (lastJsonMessage) {
				setInfo((prevState) => ({
					...prevState,
					yesterday: lastJsonMessage.o,
					now: lastJsonMessage.c,
				}))
			}
		},
		onError: (err) => console.error(err),
		shouldReconnect: () => true,
		reconnectInterval: 10000,
	})

	return (
		<div className='row gx-4 flex-nowrap w-auto'>
			<div className='col-auto'>
				<div className='form-group'>
					<label className='small mb-2'>Market Price:</label>
					<div className='d-flex gap-2 small flex-nowrap align-items-center'>
						<span className='flex-shrink-0'>Yest:</span>
						<span className='ms-auto text-end font-monospace'>
							{`${info.yesterday}`.substring(0, 10)}
						</span>
					</div>
					<div className='d-flex gap-2 small flex-nowrap align-items-center'>
						<span className='flex-shrink-0'>Now:</span>
						<span className='ms-auto text-end font-monospace'>
							{`${info.now}`.substring(0, 10)}
						</span>
					</div>
				</div>
			</div>
			<div className='col-auto'>
				<div className='form-group'>
					<label className='small mb-2'>Min. Limits:</label>
					<div className='d-flex gap-2 small flex-nowrap align-items-center'>
						<span className='flex-shrink-0 flex-grow-1 text-nowrap'>
							Min. Notional:
						</span>
						<span className='ms-auto text-end font-monospace'>{`${info.minNotional}`}</span>
					</div>
					<div className='d-flex gap-2 small flex-nowrap align-items-center'>
						<span className='flex-shrink-0 flex-grow-1 text-nowrap'>
							Min. Lot Size:
						</span>
						<span className='ms-auto text-end font-monospace'>{`${info.minLotSize}`}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
