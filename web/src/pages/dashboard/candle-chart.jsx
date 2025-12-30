// TradingViewWidget.jsx
import { memo, useEffect, useRef } from 'react'

function TradingViewWidget() {
	const container = useRef()

	useEffect(() => {
		// Container ref skip
		const currentContainer = container.current
		if (!currentContainer) {
			return
		}

		// Skip multiple injections
		const existingScript = currentContainer.querySelector('script')
		if (existingScript) {
			return
		}

		const script = document.createElement('script')
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
		script.type = 'text/javascript'
		script.async = true
		script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": true,
          "hide_side_toolbar": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "60",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "BINANCE:BTCUSDT",
          "theme": "dark",
          "timezone": "America/Sao_Paulo",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [
            "BINANCE:ETHUSDT",
            "BINANCE:SOLUSDT",
            "BINANCE:LTCUSDT"
          ],
          "withdateranges": true,
          "compareSymbols": [],
          "studies": [
            "Volume@tv-basicstudies",
            "STD;TEMA",
            "STD;Bollinger_Bands",
            "STD;PSAR",
            "STD;Stochastic_RSI"
          ],
          "autosize": true
        }`
		currentContainer.appendChild(script)

		// Cleanup container
		return () => {
			if (currentContainer) {
				currentContainer.innerHTML = ''
			}
		}
	}, [])

	return (
		<div
			className='card cardDarkTw border-0 shadow'
			style={{ width: '100%', height: 520 }}
		>
			<div className='card-body p-2'>
				<div
					className='tradingview-widget-container'
					ref={container}
					style={{ height: '100%', width: '100%' }}
				/>
			</div>
		</div>
	)
}

export default memo(TradingViewWidget)
