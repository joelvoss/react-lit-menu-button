import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: No portal</h2>
			<div>
				<Menu>
					<MenuButton id="actions-button">
						Actions{' '}
						<span aria-hidden="true" style={{ userSelect: 'none' }}>
							▾
						</span>
					</MenuButton>
					<MenuList className="menu-list" portal={false}>
						<MenuItem className="menu-item" onSelect={() => action('Download')}>
							Download
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Copy')}>
							Create a Copy
						</MenuItem>
						<MenuItem
							className="menu-item"
							onSelect={() => action('Mark as Draft')}
						>
							Mark as Draft
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Delete')}>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</>
	);
}
