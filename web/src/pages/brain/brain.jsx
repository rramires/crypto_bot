import { FormPage } from '../form-page'

export function Brain() {
	return (
		<FormPage title='Brain Inspection'>
			<ul className='nav nav-tabs' id='tabs' role='tablist'>
				<li className='nav-item' role='presentation'>
					<button
						type='button'
						className='nav-link active'
						id='memory-tab'
						role='tab'
						data-bs-toggle='tab'
						data-bs-target='#memory'
					>
						Memory
					</button>
				</li>
				<li className='nav-item' role='presentation'>
					<button
						type='button'
						className='nav-link'
						id='brain-tab'
						role='tab'
						data-bs-toggle='tab'
						data-bs-target='#brain'
					>
						Brain
					</button>
				</li>
				<li className='nav-item' role='presentation'>
					<button
						type='button'
						className='nav-link'
						id='tests-tab'
						role='tab'
						data-bs-toggle='tab'
						data-bs-target='#tests'
					>
						Tests
					</button>
				</li>
			</ul>
			<div className='tab-content px-3 mb-3' id='tabContent'>
				<div
					className='tab-pane fade show active'
					id='memory'
					role='tabpanel'
				>
					<h1>Memory</h1>
				</div>
				<div className='tab-pane fade' id='brain' role='tabpanel'>
					<h1>Brain</h1>
				</div>
				<div className='tab-pane fade' id='tests' role='tabpanel'>
					<h1>Tests</h1>
				</div>
			</div>
		</FormPage>
	)
}
