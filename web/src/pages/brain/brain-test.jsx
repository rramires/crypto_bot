import { useState } from 'react'
import Select from 'react-select'

import { MemoryForm } from './memory-form'

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

	function onIndexValueChange(hasCurrent, evt) {}

	function btnUpdateClick() {}

	return (
		<>
			<div className='row mb-3 pt-3'>
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
			<div
				className='mb-3'
				style={{
					overflow: 'auto',
					overflowX: 'hidden',
					maxHeight: 500,
				}}
			>
				<div className='row mb-3'>
					{indexValue && indexValue.previous && (
						<div className='col-6'>
							<h1 className='h6 mb-3'>Previous Value:</h1>
							<MemoryForm
								disabled={true}
								data={data[index].previous}
							/>
						</div>
					)}
					{index && (
						<div className='col-6'>
							<h1 className='h6 mb-3'>Current Value:</h1>
							{indexValue.current ? (
								<MemoryForm
									id={index}
									disabled={false}
									data={indexValue.current}
									onChange={(evt) =>
										onIndexValueChange(true, evt)
									}
								/>
							) : (
								<MemoryForm
									id={index}
									disabled={false}
									data={indexValue}
									onChange={(evt) =>
										onIndexValueChange(false, evt)
									}
								/>
							)}
						</div>
					)}
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-2'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={btnUpdateClick}
					>
						Update Memory
					</button>
				</div>
			</div>
		</>
	)
}
