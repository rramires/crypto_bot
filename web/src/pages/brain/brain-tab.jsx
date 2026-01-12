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
						{dataArr.map((obj) => (
							<tr key={id + obj.key}>
								<td>{obj.key}</td>
								<td>
									<pre>
										{JSON.stringify(obj.value, null, 4)}
									</pre>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
