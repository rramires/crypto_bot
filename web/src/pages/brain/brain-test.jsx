import { useState } from 'react'
import Select from 'react-select'

export function BrainTest({ data }) {
	const [select, setSelect] = useState('')
	const [index, setIndex] = useState('')
	const [indexValue, setIndexValue] = useState({})

	const customStyles = {
		control: (provided) => ({
			...provided,
			width: 300,
		}),
	}

	const options = Object.keys(data).map((item) => ({
		label: item,
		value: item,
	}))

	function onIndexChange(evt) {
		setSelect({ label: evt.value, value: evt.value })
		setIndex(evt.value)
		setIndexValue(data[evt.value])
	}

	return (
		<>
			<div className='row'>
				<div className='col-4'>
					<Select
						value={select}
						styles={customStyles}
						options={options}
						onChange={onIndexChange}
						onInputChange={(inputValue) => inputValue.toUpperCase()}
					/>
				</div>
			</div>
		</>
	)
}
