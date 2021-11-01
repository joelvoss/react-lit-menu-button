import * as React from 'react';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuLink,
	MenuList,
} from '../../src/index';

export function Example() {
	return (
		<>
			<h2>Example: Long text</h2>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<CustomMenuButton />
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<CustomMenuButton />
			</div>
			<div>
				<CustomMenuButton />
			</div>
		</>
	);
}

////////////////////////////////////////////////////////////////////////////////

function CustomMenuButton() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<Menu>
			<MenuButton>
				Developers Developers Developers Developers <span aria-hidden>▾</span>
			</MenuButton>
			<MenuList className="menu-list">
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
				<MenuLink className="menu-item" href="https://google.com/">
					Google something Google something Google something Google something
				</MenuLink>
			</MenuList>
		</Menu>
	);
}
