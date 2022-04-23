import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: None menu items</h2>
			<div>
				<Menu>
					<MenuButton id="actions-button">
						Actions{' '}
						<span aria-hidden="true" style={{ userSelect: 'none' }}>
							▾
						</span>
					</MenuButton>
					<MenuList className="menu-list">
						<NonMenuItem>Mammals</NonMenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Bear')}>
							Bear
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Fox')}>
							Fox
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Lion')}>
							Lion
						</MenuItem>
						<NonMenuItem>Reptiles</NonMenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Lizard')}>
							Lizard
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Snake')}>
							Snake
						</MenuItem>
						<MenuItem
							className="menu-item"
							onSelect={() => action('Crocodile')}
						>
							Crocodile
						</MenuItem>
						<NonMenuItem>Amphibians</NonMenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Frog')}>
							Frog
						</MenuItem>
						<MenuItem className="menu-item" onSelect={() => action('Toad')}>
							Toad
						</MenuItem>
						<MenuItem
							className="menu-item"
							onSelect={() => action('Salamander')}
						>
							Salamander
						</MenuItem>
					</MenuList>
				</Menu>
			</div>
		</>
	);
}

////////////////////////////////////////////////////////////////////////////////

function NonMenuItem(props) {
	return (
		<span
			style={{
				padding: '0 20px',
				margin: '10px 0',
				fontWeight: 'bold',
				color: 'orangered',
				textTransform: 'uppercase',
				fontSize: '11px',
				display: 'block',
			}}
			{...props}
		/>
	);
}
