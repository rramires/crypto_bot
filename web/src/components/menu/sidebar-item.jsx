export function SidebarItem({ to, label, icon }) {
	function activeItem(url) {
		return window.location.pathname === url ? 'nav-item active' : 'nav-item'
	}

	return (
		<>
			<li className={activeItem(to)}>
				<a href={to} className='nav-link'>
					<span className='sidebar-icon'>{icon}</span>
					<span className='sidebar-text'>{label}</span>
				</a>
			</li>
		</>
	)
}
