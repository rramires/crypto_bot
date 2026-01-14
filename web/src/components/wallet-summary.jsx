import { useEffect, useState } from 'react'

import { getBalance } from '../services/exchange-service'
import { getSymbol } from '../services/symbols-service'

export function WalletSummary({ symbol }) {
	const [wallet, setWallet] = useState({
		base: { coin: '', qty: '' },
		quote: { coin: '', qty: '' },
	})

	async function loadWalletSummary(symbolObj) {
		try {
			const balances = await getBalance()
			setWallet({
				base: {
					qty: balances[symbolObj.base].available,
					coin: symbolObj.base,
				},
				quote: {
					qty: balances[symbolObj.quote].available,
					coin: symbolObj.quote,
				},
			})
		} catch (err) {
			console.error(err.response ? err.response.data : err)
		}
	}

	useEffect(() => {
		if (!symbol) {
			return
		}
		getSymbol(symbol)
			.then((symbolObj) => loadWalletSummary(symbolObj))
			.catch((err) =>
				console.error(err.response ? err.response.data : err),
			)
	}, [symbol])

	return (
		<div className='row mb-3'>
			<div className='col-6'>
				<div className='form-group'>
					<div className='alert alert-success py-1'>
						{`${wallet.base.coin}: ${wallet.base.qty.substring(0, 10)}`}
					</div>
				</div>
			</div>
			<div className='col-6'>
				<div className='form-group'>
					<div className='alert alert-info py-1'>
						{`${wallet.quote.coin}: ${wallet.quote.qty.substring(0, 10)}`}
					</div>
				</div>
			</div>
		</div>
	)
}
