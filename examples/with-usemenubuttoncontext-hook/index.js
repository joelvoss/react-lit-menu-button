import * as React from 'react';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useMenuButtonContext,
} from '../../src/index';

export function Example() {
	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: With useMenuButtonContext Hook</h2>
			<div>
				<Menu>
					<StyledMenuButton id="example-button">
						Actions <span aria-hidden="true">▾</span>
					</StyledMenuButton>
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
			</div>
		</>
	);
}

////////////////////////////////////////////////////////////////////////////////

function StyledMenuButton(props) {
	const { isExpanded } = useMenuButtonContext();

	return (
		<MenuButton
			style={{
				...(props.style || {}),
				border: '2px solid',
				borderColor: isExpanded ? 'crimson' : 'black',
			}}
			{...props}
		/>
	);
}
