import { Footer } from '../components/footer'
import { Sidebar } from '../components/menu/sidebar'
import { Toast } from '../components/toast'

export function TemplatePage({ children }) {
	return (
		<>
			<Sidebar />
			<main className='content'>
				{children}
				<Footer />
			</main>
			<Toast />
		</>
	)
}
