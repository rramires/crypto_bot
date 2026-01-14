import { useState } from 'react'

import { SelectSymbol } from '../../components/select-symbol'
import { SymbolInfo } from '../../components/symbol-info'
import { WalletSummary } from '../../components/wallet-summary'
import { FormPage } from '../form-page'

export function NewOrder() {
	const [order, setOrder] = useState({})

	function onSymbolChange(evt) {
		setOrder((prevState) => ({ ...prevState, symbol: evt.target.value }))
	}

	return (
		<FormPage title='New Spot Order'>
			<div className='row mb-3'>
				<div className='col-3'>
					<div className='form-group'>
						<label className='small'>Symbol:</label>
						<SelectSymbol
							symbol={order.symbol}
							disabled={false}
							onChange={onSymbolChange}
						/>
					</div>
				</div>
				<div className='col-3 d-flex align-items-end justify-content-end'>
					{order.symbol && <SymbolInfo symbol={order.symbol} />}
				</div>
			</div>
			<div className='row'>
				<label className='small'>You Have:</label>
				<div className='col-6'>
					<WalletSummary symbol={order.symbol} />
				</div>
			</div>
		</FormPage>
	)
}
