import { useState } from 'react'

export function BrainTab({ id, data, hasSearch = false }) {
	const [search, setSearch] = useState('')

	// FIXME: Remove after use this prop
	id

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
					<tbody>{JSON.stringify(data)}</tbody>
				</table>
			</div>
		</>
	)
}
