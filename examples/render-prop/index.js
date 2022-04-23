import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: Render prop</h2>
			<div>
				<Menu>
					{({ isExpanded }) => (
						<>
							<MenuButton>
								{isExpanded ? 'Close' : 'Open'}{' '}
								<span aria-hidden="true">▾</span>
							</MenuButton>
							<MenuList className="menu-list">
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
							</MenuList>
						</>
					)}
				</Menu>
			</div>
		</>
	);
}
