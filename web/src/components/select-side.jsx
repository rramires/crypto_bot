export function SelectSide({ side, onChange }) {
	return (
		<div className='form-group'>
			<label htmlFor='side'>Side:</label>
			<select
				id='side'
				className='form-select'
				value={side}
				onChange={onChange}
			>
				<option value='BUY'>Buy</option>
				<option value='SELL'>Sell</option>
			</select>
		</div>
	)
}
