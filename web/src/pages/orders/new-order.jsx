import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { OrderType } from '../../components/order-type'
import { QuantityInput } from '../../components/quantity-input'
import { SelectSide } from '../../components/select-side'
import { SelectSymbol } from '../../components/select-symbol'
import { SymbolInfo } from '../../components/symbol-info'
import { WalletSummary } from '../../components/wallet-summary'
import { LIMIT_TYPES, STOP_TYPES } from '../../services/exchange-service'
import { placeOrder } from '../../services/orders-service'
import { FormPage } from '../form-page'

export function NewOrder() {
	const navigate = useNavigate()

	const [order, setOrder] = useState({
		side: 'BUY',
		type: 'MARKET',
		isQuote: false,
		quantity: 0,
	})
	const [error, setError] = useState('')

	function getStopPriceClasses(orderType) {
		return STOP_TYPES.includes(orderType) ? 'col-3' : 'd-none'
	}

	function getLimitPriceClasses(orderType) {
		return LIMIT_TYPES.includes(orderType) ? 'col-3' : 'd-none'
	}

	function onSymbolChange(evt) {
		setOrder((prevState) => ({ ...prevState, symbol: evt.target.value }))
	}

	function onInputChange(evt) {
		setOrder((prevState) => ({
			...prevState,
			[evt.target.id]: evt.target.value,
		}))
	}

	function btnSendClick() {
		setError('')
		placeOrder(order)
			.then(() => navigate('/orders'))
			.catch((err) => {
				console.error(err)
				setError(err)
			})
	}

	return (
		<FormPage title='New Spot Order'>
			<div className='row mb-3'>
				<div className='col-3'>
					<div className='form-group'>
						<label className='small'>Symbol:</label>
						<SelectSymbol
							symbol={order.symbol}
							disabled={false}
							onChange={onSymbolChange}
						/>
					</div>
				</div>
				<div className='col-3 d-flex align-items-end justify-content-end'>
					{order.symbol && <SymbolInfo symbol={order.symbol} />}
				</div>
			</div>
			<div className='row'>
				<label className='small'>You Have:</label>
				<div className='col-6'>
					<WalletSummary symbol={order.symbol} />
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-3'>
					<SelectSide side={order.side} onChange={onInputChange} />
				</div>
				<div className='col-3'>
					<OrderType type={order.type} onChange={onInputChange} />
				</div>
			</div>
			<div className='row mb-3'>
				<div className={getStopPriceClasses(order.type)}>
					<div className='form-group'>
						<label className='small' htmlFor='stopPrice'>
							Stop Price:
						</label>
						<input
							className='form-control'
							id='stopPrice'
							type='number'
							placeholder='0'
							value={order.stopPrice || ''}
							onChange={onInputChange}
						/>
					</div>
				</div>
				<div className={getStopPriceClasses(order.type)}>
					<div className='form-group'>
						<label className='small' htmlFor='trailingDelta'>
							Trailing Delta:
						</label>
						<input
							className='form-control'
							id='trailingDelta'
							type='trailingDelta'
							placeholder='0'
							value={order.trailingDelta || ''}
							onChange={onInputChange}
						/>
					</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className={getLimitPriceClasses(order.type)}>
					<div className='form-group'>
						<label className='small' htmlFor='limitPrice'>
							Limit Price:
						</label>
						<input
							className='form-control'
							id='limitPrice'
							type='number'
							placeholder='0'
							value={order.limitPrice || ''}
							onChange={onInputChange}
						/>
					</div>
				</div>
				<div className='col-3'>
					<div className='form-group'>
						<QuantityInput
							symbol={order.symbol}
							quantity={order.quantity}
							isQuote={order.isQuote}
							allowQuote={order.type === 'MARKET'}
							onChange={onInputChange}
						/>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-3'>
					<button
						type='button'
						className='btn btn-primary'
						onClick={btnSendClick}
						disabled={order.quantity === 0}
					>
						Send Order
					</button>
					<a href='/orders/new' className=' btn btn-light'>
						Cancel
					</a>
				</div>
				{error && (
					<div className='alert alert-danger mt-1 col-3 py-1'>
						{error}
					</div>
				)}
			</div>
			<pre>{JSON.stringify(order, null, 4)}</pre>
		</FormPage>
	)
}
