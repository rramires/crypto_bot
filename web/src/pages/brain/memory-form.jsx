export function MemoryForm({ id, data, disabled, onChange }) {
	if (!data) {
		return <></>
	}

	return (
		<>
			{typeof data === 'object' ? (
				Object.keys(data)
					.sort()
					.map((item) => (
						<div>
							{item}:{JSON.stringify(data[item])}
						</div>
					))
			) : (
				<div>{data}</div>
			)}
		</>
	)
}
