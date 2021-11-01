import * as React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	const [buttonText, setButtonText] = React.useState(null);
	const [linkText, setLinkText] = React.useState(null);
	const linkRef = React.useRef(null);

	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: Focus on select</h2>
			<div>
				<p>
					When a menu is closed by escaping or selecting a menu item, the menu
					button should typically receive focus.
				</p>
				<p>
					However you may want a menu item to move the user to another part of
					your UI and move focus along with it.
				</p>
				<Menu>
					<MenuButton
						onFocus={() => setButtonText('Focused! ')}
						onBlur={() => setButtonText(null)}
						id="example-button"
					>
						{buttonText}
						Actions <span aria-hidden="true">▾</span>
					</MenuButton>
					<MenuList className="menu-list">
						<MenuItem
							className="menu-item"
							onSelect={() => {
								action('Select Google Link');
								requestAnimationFrame(() => {
									linkRef.current.focus();
								});
							}}
						>
							Select Google Link
						</MenuItem>
						<MenuItem
							className="menu-item"
							onSelect={() => action('Close and Focus Button')}
						>
							Close and Focus Button
						</MenuItem>
					</MenuList>
				</Menu>
				<hr />
				<a
					href="https://google.com"
					target="_blank"
					rel="noopener noreferrer"
					ref={linkRef}
					onFocus={() => setLinkText('Focused! ')}
					onBlur={() => setLinkText(null)}
				>
					{linkText}
					Go to Google
				</a>
			</div>
		</>
	);
}
