import { MemoryInput } from './memory-input'

export function MemoryForm({ id, data, originalData, disabled, onChange }) {
	if (data === null || data === undefined) {
		return <></>
	}

	function getType(item) {
		const typeSource = originalData !== undefined ? originalData : data
		const value =
			typeof typeSource === 'object' ? typeSource[item] : typeSource
		return parseFloat(value) || value === 0 || value === '0'
			? 'number'
			: 'text'
	}

	return (
		<>
			{typeof data === 'object' ? (
				Object.keys(data)
					.sort()
					.map((item) => (
						<MemoryInput
							key={item}
							id={item}
							disabled={disabled}
							type={getType(item)}
							onChange={onChange}
							data={data[item]}
						/>
					))
			) : (
				<MemoryInput
					id={id}
					disabled={disabled}
					type={getType(id)}
					onChange={onChange}
					data={data}
				/>
			)}
		</>
	)
}
