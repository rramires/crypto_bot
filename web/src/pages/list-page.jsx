import { TemplatePage } from './template-page'

export function ListPage({ title, button, table }) {
	return (
		<TemplatePage>
			<div className='d-flex justify-content-between flex-nowrap align-items-center py-4'>
				<div className='d-block mb-0'>
					<h2 className='h4'>{title}</h2>
				</div>
				<div className='btn-toolbar mb-0'>
					<div className='d-inline-flex align-items-center'>
						{button}
					</div>
				</div>
			</div>
			{table}
		</TemplatePage>
	)
}
