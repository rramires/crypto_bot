import { useEffect, useState } from 'react'

import { getSymbol } from '../services/symbols-service'

export function QuantityInput({
	symbol,
	quantity,
	isQuote,
	allowQuote,
	onChange,
}) {
	const [selSymbol, setSelSymbol] = useState({ base: '', quote: '' })

	useEffect(() => {
		if (!symbol) {
			return
		}

		getSymbol(symbol)
			.then((symbolObj) => setSelSymbol(symbolObj))
			.catch((err) =>
				console.error(err.response ? err.response.data : err),
			)
	}, [symbol])

	function btnQuoteClick() {
		onChange({ target: { id: 'isQuote', value: !isQuote } })
	}

	function isQuoteSymbol() {
		return isQuote || isQuote === 'true' ? selSymbol.quote : selSymbol.base
	}

	function handleQuantityChange(evt) {
		const value = evt.target.value
		if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
			onChange(evt)
		}
	}

	return (
		<div className='form-group'>
			<label className='small'>Quantity:</label>
			<div className='input-group'>
				{allowQuote && selSymbol.base && (
					<button
						type='button'
						className='btn btn-secondary d-inline-flex align-align-items-center'
						onClick={btnQuoteClick}
					>
						{isQuoteSymbol()}
					</button>
				)}
				<input
					id='quantity'
					type='number'
					className='form-control'
					placeholder='0'
					min='0'
					step='any'
					value={quantity || ''}
					onChange={handleQuantityChange}
				/>
			</div>
		</div>
	)
}
