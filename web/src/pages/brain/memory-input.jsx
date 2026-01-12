export function MemoryInput({ id, data, type, disabled, onChange }) {
	function handleChange(evt) {
		const inputValue = evt.target.value

		if (type === 'number') {
			if (inputValue !== '' && !/^[\d.]*$/.test(inputValue)) {
				return
			}

			const parts = inputValue.split('.')
			const cleanValue =
				parts.length > 2
					? parts[0] + '.' + parts.slice(1).join('')
					: inputValue

			const newEvent = {
				...evt,
				target: {
					...evt.target,
					id: evt.target.id,
					value: cleanValue,
				},
			}
			onChange(newEvent)
		} else {
			onChange(evt)
		}
	}

	const displayValue = data !== null && data !== undefined ? String(data) : ''

	return (
		<div className='row mb-3'>
			<div className='col-4 ms-3'>{id}</div>
			<div className='col-6'>
				<input
					type='text'
					inputMode={type === 'number' ? 'decimal' : 'text'}
					id={id}
					disabled={disabled}
					className='form-control form-control-sm'
					onChange={handleChange}
					value={displayValue}
				/>
			</div>
		</div>
	)
}
