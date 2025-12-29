import { Sidebar } from '../components/menu/sidebar'

export function TemplatePage({ children }) {
	return (
		<>
			<Sidebar />
			<main className='content'>{children}</main>
		</>
	)
}
