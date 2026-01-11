import { useEffect, useState } from 'react'

import { getBrain, getMemory } from '../../services/brain-service'
import { FormPage } from '../form-page'
import { BrainTab } from './brain-tab'
import { BrainTest } from './brain-test'

export function Brain() {
	const [brain, setBrain] = useState({})
	const [memory, setMemory] = useState({})

	useEffect(() => {
		getBrain()
			.then((brain) => setBrain(brain))
			.catch((err) =>
				setBrain({
					error: err.response ? err.response.data : err.message,
				}),
			)

		getMemory()
			.then((memory) => setMemory(memory))
			.catch((err) =>
				setMemory({
					error: err.response ? err.response.data : err.message,
				}),
			)
	}, [])

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
					<BrainTab id='memory' data={memory} hasSearch={true} />
				</div>
				<div className='tab-pane fade' id='brain' role='tabpanel'>
					<BrainTab id='brain' data={brain} />
				</div>
				<div className='tab-pane fade' id='tests' role='tabpanel'>
					<BrainTest id='test' data={memory} />
				</div>
			</div>
		</FormPage>
	)
}
