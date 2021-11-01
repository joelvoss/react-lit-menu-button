import * as React from 'react';
import { DialogContent, DialogOverlay } from '@react-lit/dialog';
import { Menu, MenuButton, MenuItem, MenuList } from '../../src/index';

export function Example() {
	let [showDialog, setShowDialog] = React.useState(false);

	const action = str => {
		// eslint-disable-next-line no-console
		console.log(str);
	};

	return (
		<>
			<h2>Example: Inside dialog</h2>
			<div>
				<button onClick={() => setShowDialog(true)}>Show Dialog</button>
				<DialogOverlay
					isOpen={showDialog}
					onDismiss={() => setShowDialog(false)}
				>
					<DialogContent
						aria-label="Some actions"
						style={{
							border: 'solid 5px hsla(0, 0%, 0%, 0.5)',
							borderRadius: '10px',
						}}
					>
						<Menu
							// NOTE(joel): Because of how the focus lock works with
							// @react-lit/dialog, portaled nodes, such as the element
							// rendered by the menu button popover, cannot receive focus
							// without the focus lock immediately stealing it back and
							// closing the menu.
							// To use the menu inside a dialog, set the `portal` prop to
							// false.
							// This may impact styling since the popover is absolutely
							// positioned, so the easiest solution is for the entire menu
							// button and popover to be rendered in a shared,
							// relative-positioned container. By default `Menu` does not
							// render a DOM node, so you can either pass an element to its
							// `as` prop or wrap it in your own container.
							as="span"
							style={{ display: 'inline-block', position: 'relative' }}
						>
							<MenuButton>Actions 1 (portaled)</MenuButton>
							<MenuList className="menu-list" portal={false}>
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
							</MenuList>
						</Menu>

						<Menu>
							<MenuButton>Actions 2 (unportaled)</MenuButton>
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
							</MenuList>
						</Menu>
					</DialogContent>
				</DialogOverlay>
			</div>
		</>
	);
}
