import * as React from 'react';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	MenuPopover,
} from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: Custom Wrapper</h2>
			<div>
				<Menu>
					<MenuButton id="example-button">
						Actions <span aria-hidden="true">▾</span>
					</MenuButton>
					<MenuPopover>
						<div style={{ border: '3px solid red' }}>
							<MenuItems>
								<MenuItem
									className="menu-item"
									onSelect={() => action('Download')}
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
								<MenuItem
									className="menu-item"
									onSelect={() => action('Delete')}
								>
									Delete
								</MenuItem>
							</MenuItems>
						</div>
						<hr />
						<p>Some arbitrary element inside the menu list</p>
					</MenuPopover>
				</Menu>
			</div>
		</>
	);
}
