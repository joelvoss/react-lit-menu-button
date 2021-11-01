import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	let [disabled, setDisabled] = React.useState(true);

	return (
		<>
			<h2>Example: With disabled items</h2>
			<div>
				<Menu>
					<MenuButton>
						Open <span aria-hidden="true">▾</span>
					</MenuButton>
					<MenuList className="menu-list">
						<MenuItem
							className="menu-item"
							onSelect={() => action('Download')}
							disabled={disabled}
						>
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

				<button onClick={() => setDisabled(!disabled)}>
					{disabled ? 'Enable' : 'Disable'} the first item
				</button>
			</div>
		</>
	);
}
