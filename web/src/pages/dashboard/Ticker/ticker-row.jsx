import { useMemo } from 'react'

export function TickerRow({ symbol, data }) {
	const content = useMemo(() => {
		// skip
		if (!data) {
			return null
		}

		function getClass() {
			return parseFloat(data.c) > parseFloat(data.o)
				? 'text-success fw-bold'
				: 'text-danger fw-bold'
		}

		/*
        Row infos:
        c = close - actual price
        o = open
        h = high
        l = low
        */
		return (
			<tr>
				<td className='text-gray-900 fw-bold'>{symbol}</td>
				<td className={getClass()}>{data.c.substring(0, 8)}</td>
				<td className='text-gray-900'>{data.o.substring(0, 8)}</td>
				<td className='text-gray-900'>{data.h.substring(0, 8)}</td>
				<td className='text-gray-900'>{data.l.substring(0, 8)}</td>
			</tr>
		)
	}, [data, symbol])

	return content
}
