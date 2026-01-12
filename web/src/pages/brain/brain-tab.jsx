import { useMemo, useState } from 'react'

export function BrainTab({ id, data, hasSearch = false }) {
	const [search, setSearch] = useState('')

	const dataArr = useMemo(() => {
		if (!data) {
			return []
		}

		let arr = Object.entries(data).map((prop) => {
			return {
				key: prop[0],
				value: prop[1],
			}
		})

		if (search) {
			arr = arr.filter((item) => item.key.indexOf(search) !== -1)
		}

		arr.sort((a, b) => {
			if (a.key > b.key) return 1
			if (a.key < b.key) return -1
			return 0
		})

		return arr
	}, [data, search])

	function onSearchChange(event) {
		setSearch(event.target.value.toUpperCase())
	}

	function renderValue(obj) {
		const isTicker = obj.key.includes(':TICKER')
		const hasPreviousCurrent = obj.value?.previous && obj.value?.current

		if (isTicker && hasPreviousCurrent) {
			return (
				<div style={{ display: 'flex', gap: '20px' }}>
					<div style={{ flex: 1 }}>
						<strong>Previous:</strong>
						<pre>{JSON.stringify(obj.value.previous, null, 4)}</pre>
					</div>
					<div style={{ flex: 1 }}>
						<strong>Current:</strong>
						<pre>{JSON.stringify(obj.value.current, null, 4)}</pre>
					</div>
				</div>
			)
		}

		return <pre>{JSON.stringify(obj.value, null, 4)}</pre>
	}

	return (
		<>
			{hasSearch && (
				<div className='row'>
					<div className='col-3 my-3'>
						<div className='form-group'>
							<label htmlFor='search'>Search:</label>
							<input
								type='text'
								id='search'
								className='form-control'
								value={search}
								onChange={onSearchChange}
							/>
						</div>
					</div>
				</div>
			)}
			<div className='table-responsive divScrollBeholder'>
				<table className='table table-flush table-sm table-hover'>
					<thead>
						<tr>
							<th className='border-gray-200'>Key</th>
							<th className='border-gray-200'>Value</th>
						</tr>
					</thead>
					<tbody>
						{dataArr.map((obj, index) => (
							<tr
								key={id + obj.key}
								style={{
									backgroundColor:
										index % 2 === 0 ? '#F2F4F6' : '#FFF',
								}}
							>
								<td>{obj.key}</td>
								<td>{renderValue(obj)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
