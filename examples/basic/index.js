import * as React from 'react';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuLink,
	MenuList,
} from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: Basic</h2>
			<div>
				<Menu>
					<MenuButton id="actions-button">
						Actions{' '}
						<span aria-hidden="true" style={{ userSelect: 'none' }}>
							▾
						</span>
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
					</MenuList>
				</Menu>
				<Menu>
					<MenuButton id="links-button">
						Links{' '}
						<span aria-hidden="true" style={{ userSelect: 'none' }}>
							▾
						</span>
					</MenuButton>
					<MenuList className="menu-list">
						<MenuLink className="menu-item" href="https://google.com">
							Google
						</MenuLink>
						<MenuLink className="menu-item" href="https://duckduckgo.com">
							Duck Duck Go
						</MenuLink>
					</MenuList>
				</Menu>
			</div>
		</>
	);
}
