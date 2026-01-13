import { useState } from 'react'

import { SelectSymbol } from '../../components/select-symbol'
import { FormPage } from '../form-page'

export function NewOrder() {
	const [order, setOrder] = useState({})

	function onSymbolChange() {}

	return (
		<FormPage title='New Spot Order'>
			<div className='col-3 mb-3'>
				<div className='form-group'>
					<label>Symbol:</label>
					<SelectSymbol
						symbol={order.symbol}
						disabled={false}
						onChange={onSymbolChange}
					/>
				</div>
			</div>
		</FormPage>
	)
}
