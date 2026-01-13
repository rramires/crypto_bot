import { useState } from 'react'
import Select from 'react-select'

export function SelectSymbol({ symbol, disabled, onChange }) {
	const [symbols, setSymbols] = useState([])
	const [value, setValue] = useState('')

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: 220,
		}),
	}

	function onSymbolChange() {
		onChange()
	}

	return (
		<Select
			value={value}
			isDisabled={disabled}
			styles={customStyles}
			onChange={onSymbolChange}
			options={symbols}
		/>
	)
}
