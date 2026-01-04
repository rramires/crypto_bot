export function WalletRow({ symbol, available, onOrder }) {
	// skip
	if (!parseFloat(available) && !parseFloat(onOrder)) {
		return null
	}

	return (
		<tr>
			<td className='text-gray-900 fw-bold'>
				<img
					className='me-2'
					width={26}
					src={`/img/icons/${symbol.toLowerCase()}.svg`}
				/>
				{symbol}
			</td>
			<td className='text-gray-900'>{available.substring(0, 10)}</td>
			<td className='text-gray-900'>{onOrder.substring(0, 10)}</td>
			{/* <td className='text-gray-900'>
				{(onOrder + available).substring(0, 10)}
			</td> */}
		</tr>
	)
}
