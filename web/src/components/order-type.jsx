export function OrderType({ type, onChange }) {
	return (
		<div className='form-group'>
			<label className='small' htmlFor='type'>
				Type:
			</label>
			<select
				id='type'
				className='form-select'
				value={type}
				onChange={onChange}
			>
				<option value='LIMIT'>Limit</option>
				<option value='MARKET'>Market</option>
				<option value='STOP_LOSS'>Stop Loss</option>
				<option value='STOP_LOSS_LIMIT'>Stop Loss Limit</option>
				<option value='TAKE_PROFIT'>Take Profit</option>
				<option value='TAKE_PROFIT_LIMIT'>Take Profit Limit</option>
			</select>
		</div>
	)
}
