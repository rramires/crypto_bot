export function Footer() {
	return (
		<footer className='bg-white rounded shadow px-4 py-3 mb-3 mt-4'>
			<div className='row'>
				<div className='col-12 col-md-4 col-xl-6 mb-4 mb-md-0'>
					<p className='mb-0 text-center text-lg-start'>
						<a
							className='text-primary fw-normal'
							href='https://flexbr.com'
							target='_blank'
						>
							© 2025-<span className='current-year'>2026</span> -
							FlexBr
						</a>
					</p>
				</div>
				<div className='col-12 col-md-8 col-xl-6 text-center text-lg-start'>
					<ul className='list-inline list-group-flush list-group-borderless text-md-end mb-0'>
						<li className='list-inline-item px-0 px-sm-2'>
							<a
								href='https://flexbr.com/contacts/'
								target='_blank'
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
