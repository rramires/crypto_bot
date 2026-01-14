import { useEffect, useState } from 'react'
import Select from 'react-select'

import { getAllSymbols } from '../services/symbols-service.js'

export function SelectSymbol({ symbol, disabled, onChange }) {
	const [symbols, setSymbols] = useState([])

	useEffect(() => {
		getAllSymbols().then((symbolsObject) => {
			const symbolNames = symbolsObject.map((s) => s.symbol).sort()
			setSymbols(
				symbolNames.map((s) => {
					return {
						value: s,
						label: s,
					}
				}),
			)
		})
	}, [])

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: 240,
		}),
	}

	function onSymbolChange(evt) {
		onChange({ target: { id: 'symbol', value: evt.value } })
	}

	return (
		<Select
			className='small'
			value={{ value: symbol, label: symbol }}
			isDisabled={disabled}
			styles={customStyles}
			onChange={onSymbolChange}
			options={symbols}
		/>
	)
}
