import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	return (
		<>
			<h2>Example: Corners</h2>
			<div
				style={{
					position: 'relative',
					height: 'calc(100vh - 80px)',
				}}
			>
				<CustomMenuButton
					style={{ position: 'absolute', top: 0, left: 0 }}
					id="button-1"
				/>
				<CustomMenuButton
					style={{ position: 'absolute', top: 0, right: 0 }}
					id="button-2"
				/>
				<CustomMenuButton
					style={{ position: 'absolute', bottom: 0, left: 0 }}
					id="button-3"
				/>
				<CustomMenuButton
					style={{ position: 'absolute', bottom: 0, right: 0 }}
					id="button-4"
				/>
			</div>
		</>
	);
}

////////////////////////////////////////////////////////////////////////////////

function CustomMenuButton({ ...props }) {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<Menu>
			<MenuButton {...props}>
				Actions <span aria-hidden="true">▾</span>
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
	);
}
