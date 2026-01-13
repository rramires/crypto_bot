import { useState } from 'react'

export function SymbolInfo({ symbol }) {
	const [info, setInfo] = useState({
		yesterday: 0,
		now: 0,
		minNotional: 10,
		minLotSize: 10,
	})

	return (
		<div className='row'>
			<div className='col-6'>
				<div className='form-group'>
					<label className='small'>Market Price:</label>
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
			<div className='col-6'>
				<div className='form-group'>
					<label className='small'>Min. Limits:</label>
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
