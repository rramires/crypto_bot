export function SidebarItem({ to, label, icon, onClick }) {
	function activeItem(url) {
		return window.location.pathname === url ? 'nav-item active' : 'nav-item'
	}

	return (
		<>
			<li className={activeItem(to)}>
				<a href={to} className='nav-link' onClick={onClick}>
					<span className='sidebar-icon'>{icon}</span>
					<span className='sidebar-text'>{label}</span>
				</a>
			</li>
		</>
	)
}
