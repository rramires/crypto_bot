import { useState } from 'react'
import Select from 'react-select'

import { updateMemory } from '../../services/brain-service.js'
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

	function onIndexValueChange(hasCurrent, evt) {
		const value = evt.target.value

		if (!hasCurrent) {
			if (typeof indexValue === 'object') {
				setIndexValue((prevState) => ({
					...prevState,
					[evt.target.id]: value,
				}))
			} else {
				setIndexValue(value)
			}
		} else {
			const currentValue = { ...indexValue.current }
			currentValue[evt.target.id] = value

			setIndexValue({
				previous: indexValue.previous,
				current: currentValue,
			})
		}
	}

	function convertToFloatIfNecessary() {
		const isOriginalNumber = (originalVal) => {
			return (
				typeof originalVal === 'number' ||
				(typeof originalVal === 'string' &&
					(parseFloat(originalVal) || originalVal === '0'))
			)
		}

		const parseValue = (val, originalVal) => {
			if (val === '' || val === null || val === undefined) return val
			if (isOriginalNumber(originalVal) && !isNaN(val)) {
				return parseFloat(val)
			}
			return val
		}

		const originalData = data[index]
		let processedValue

		if (indexValue.current) {
			const originalCurrent = originalData.current
			processedValue = {
				previous: indexValue.previous,
				current:
					typeof indexValue.current === 'object'
						? Object.fromEntries(
								Object.entries(indexValue.current).map(
									([key, val]) => [
										key,
										parseValue(val, originalCurrent[key]),
									],
								),
							)
						: parseValue(indexValue.current, originalCurrent),
			}
		} else if (typeof indexValue === 'object') {
			processedValue = Object.fromEntries(
				Object.entries(indexValue).map(([key, val]) => [
					key,
					parseValue(val, originalData[key]),
				]),
			)
		} else {
			processedValue = parseValue(indexValue, originalData)
		}
		return processedValue
	}

	function btnUpdateClick() {
		const processedValue = convertToFloatIfNecessary()

		console.log(processedValue)

		updateMemory(
			index,
			indexValue.current ? processedValue.current : processedValue,
		)
			.then((results) =>
				alert('Memory updated:\n' + JSON.stringify(results)),
			)
			.catch((err) =>
				alert(
					err.response
						? JSON.stringify(err.response.data)
						: err.message,
				),
			)
	}

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
							<h1 className='h5 mb-3'>Current Value:</h1>
							{indexValue.current ? (
								<MemoryForm
									id={index}
									disabled={false}
									data={indexValue.current}
									originalData={data[index].current}
									onChange={(evt) =>
										onIndexValueChange(true, evt)
									}
								/>
							) : (
								<MemoryForm
									id={index}
									disabled={false}
									data={indexValue}
									originalData={data[index]}
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
