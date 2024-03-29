import * as React from 'react';
import {
	render,
	screen,
	fireEvent,
	simulateMouseClick,
	simulateSpaceKeyClick,
	simulateEnterKeyClick,
} from './test-utils';
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '../src/index';

let noop = () => {};

describe('<MenuButton /> with <MenuItem />', () => {
	describe('a11y', () => {
		describe('ARIA attributes', () => {
			it('`role` is set to `menu` for list element', () => {
				let { button, list } = renderTestMenu();

				// Toggle the menu so that it is rendered
				simulateMouseClick(button);
				expect(list).toHaveAttribute('role', 'menu');
			});

			it('`aria-controls` for button element points to the list element id', () => {
				let rendered = renderTestMenu();

				// Toggle the menu so that it is rendered
				simulateMouseClick(rendered.button);

				let id = rendered.list.getAttribute('id');
				expect(rendered.button).toHaveAttribute('aria-controls', id);
			});

			it('`aria-haspopup` for button element is present', () => {
				let rendered = renderTestMenu();
				expect(rendered.button).toHaveAttribute('aria-haspopup');
			});

			describe('when the list is not toggled', () => {
				it('`aria-expanded` for the button element is not present', () => {
					let rendered = renderTestMenu();
					expect(rendered.button).not.toHaveAttribute('aria-expanded');
				});
			});

			describe('when the list is toggled', () => {
				let rendered;
				beforeEach(() => {
					rendered = renderTestMenu();
					simulateMouseClick(rendered.button);
				});

				it('`role` is set to `menuitem` for item elements', () => {
					expect(rendered.items[0]).toHaveAttribute('role', 'menuitem');
					expect(rendered.items[1]).toHaveAttribute('role', 'menuitem');
				});

				it('`aria-expanded` for the button element is true', async () => {
					expect(rendered.button).toHaveAttribute('aria-expanded', 'true');
				});

				it('`aria-labelledby` for list element points to the button element id', () => {
					let id = rendered.button.getAttribute('id');
					expect(rendered.list).toHaveAttribute('aria-labelledby', id);
				});

				it('`aria-activedescendant` for list element is not present', () => {
					expect(rendered.list).not.toHaveAttribute('aria-activedescendant');
				});

				describe('when mouse enters an item', () => {
					it('`aria-activedescendant` for list element points to the active item', () => {
						let item = rendered.items[0];
						let id = item.getAttribute('id');
						fireEvent.mouseEnter(item);
						expect(rendered.list).toHaveAttribute('aria-activedescendant', id);
					});
				});
			});
		});
	});

	describe('rendering', () => {
		it('passes DOM props to the button', () => {
			let { getByRole } = render(
				<Menu>
					<MenuButton id="test-id">Actions</MenuButton>
					<MenuList>
						<MenuItem onSelect={noop}>Download</MenuItem>
					</MenuList>
				</Menu>,
			);
			let button = getByRole('button');
			expect(button).toHaveAttribute('id', 'test-id');
		});

		it('should not show the menu list by default', () => {
			let { list } = renderTestMenu();
			expect(list).not.toBeVisible();
		});
	});

	describe('user events', () => {
		it('should show the list when the button is clicked', () => {
			let rendered = renderTestMenu();
			simulateMouseClick(rendered.button);

			expect(rendered.list).toBeVisible();
			simulateMouseClick(rendered.button);
			expect(rendered.list).not.toBeVisible();
		});

		it('should call `onSelect` when user selects an item', () => {
			let rendered = renderTestMenu();
			simulateSpaceKeyClick(rendered.button, { fireClick: true });
			simulateSpaceKeyClick(rendered.items[0]);
			expect(rendered.selectCallbacks[0]).toHaveBeenCalledTimes(1);
		});

		it('should not focus the button when user selects an item with click', () => {
			let rendered = renderTestMenu();
			simulateMouseClick(rendered.button);
			simulateMouseClick(rendered.items[0]);
			expect(rendered.button).not.toHaveFocus();
		});

		it('should manage focus when user selects an item with `Space` key', () => {
			let rendered = renderTestMenu();

			simulateSpaceKeyClick(rendered.button, { fireClick: true });
			simulateSpaceKeyClick(rendered.items[0]);
			expect(rendered.button).toHaveFocus();
		});

		it('should manage focus when user selects an item with `Enter` key', () => {
			let rendered = renderTestMenu();

			simulateSpaceKeyClick(rendered.button, { fireClick: true });
			simulateEnterKeyClick(rendered.items[0]);
			expect(rendered.button).toHaveFocus();
		});

		it('should manage focus when user dismisses with the `Escape` key', () => {
			let rendered = renderTestMenu();
			simulateMouseClick(rendered.button);
			fireEvent.keyDown(rendered.list, { key: 'Escape' });
			expect(rendered.button).toHaveFocus();
		});

		it('should not manage focus when user clicks outside element', () => {
			let { getByRole } = render(
				<>
					<Menu>
						<MenuButton>Actions</MenuButton>
						<MenuList portal={false}>
							<MenuItem onSelect={noop}>Download</MenuItem>
						</MenuList>
					</Menu>
					<input type="text" />
				</>,
			);
			let button = getByRole('button');
			let input = getByRole('textbox');

			simulateMouseClick(button);
			fireEvent.click(input);
			expect(button).not.toHaveFocus();
		});
	});
});

////////////////////////////////////////////////////////////////////////////////

describe('<MenuButton /> with axe', () => {
	describe('with <MenuItem />', () => {
		it('Should not have ARIA violations', async () => {
			jest.useRealTimers();
			let { container, list, button } = renderTestMenu();

			await expect(container).toHaveNoAxeViolations();

			// Toggle the menu and check again
			simulateMouseClick(button);
			await expect(container).toHaveNoAxeViolations();

			// We have to check the container and list separately since the list is
			// portaled outside of the container.
			await expect(list).toHaveNoAxeViolations();
		});
	});

	describe('with <MenuLink />', () => {
		it('Should not have ARIA violations', async () => {
			jest.useRealTimers();
			let { container, list, button } = renderTestMenuWithLinks();

			await expect(container).toHaveNoAxeViolations();

			// Toggle the menu and check again
			simulateMouseClick(button);
			await expect(container).toHaveNoAxeViolations();

			// We have to check the container and list separately since the list is
			// portaled outside of the container.
			await expect(list).toHaveNoAxeViolations();
		});
	});

	describe('with <MenuItem /> and <MenuLink />', () => {
		it('Should not have ARIA violations', async () => {
			jest.useRealTimers();
			let { container, list, button } = renderTestMenuWithLinksAndItems();

			await expect(container).toHaveNoAxeViolations();

			// Toggle the menu and check again
			simulateMouseClick(button);
			await expect(container).toHaveNoAxeViolations();

			// We have to check the container and list separately since the list is
			// portaled outside of the container.
			await expect(list).toHaveNoAxeViolations();
		});
	});
});

////////////////////////////////////////////////////////////////////////////////

function renderTestMenu() {
	let cb1 = jest.fn();
	let cb2 = jest.fn();
	let { getByRole, container } = render(
		<Menu>
			<MenuButton>
				Actions <span aria-hidden="true">▾</span>
			</MenuButton>
			<MenuList data-testid="list">
				<MenuItem onSelect={cb1}>Download</MenuItem>
				<MenuItem onSelect={cb2}>Create a Copy</MenuItem>
			</MenuList>
		</Menu>,
	);
	return {
		container,
		get root() {
			return document.body;
		},
		get button() {
			return getByRole('button');
		},
		get list() {
			return screen.getByTestId('list');
		},
		get items() {
			return [screen.getByText('Download'), screen.getByText('Create a Copy')];
		},
		selectCallbacks: [cb1, cb2],
	};
}

////////////////////////////////////////////////////////////////////////////////

function renderTestMenuWithLinks() {
	let cb1 = jest.fn();
	let cb2 = jest.fn();
	let { getByRole, container } = render(
		<Menu>
			<MenuButton>
				Navigation <span aria-hidden="true">▾</span>
			</MenuButton>
			<MenuList data-testid="list">
				<MenuLink href="/" onSelect={cb1}>
					Home
				</MenuLink>
				<MenuLink href="/about" onSelect={cb2}>
					About
				</MenuLink>
			</MenuList>
		</Menu>,
	);
	return {
		container,
		get root() {
			return document.body;
		},
		get button() {
			return getByRole('button');
		},
		get list() {
			return screen.getByTestId('list');
		},
		get items() {
			return [screen.getByText('Home'), screen.getByText('About')];
		},
		selectCallbacks: [cb1, cb2],
	};
}

////////////////////////////////////////////////////////////////////////////////

function renderTestMenuWithLinksAndItems() {
	let cb1 = jest.fn();
	let cb2 = jest.fn();
	let { getByRole, container } = render(
		<Menu>
			<MenuButton>
				Actions and Links <span aria-hidden="true">▾</span>
			</MenuButton>
			<MenuList data-testid="list">
				<MenuItem onSelect={cb1}>Download</MenuItem>
				<MenuLink href="/about" onSelect={cb2}>
					About
				</MenuLink>
			</MenuList>
		</Menu>,
	);
	return {
		container,
		get root() {
			return document.body;
		},
		get button() {
			return getByRole('button');
		},
		get list() {
			return screen.getByTestId('list');
		},
		get items() {
			return [screen.getByText('Home'), screen.getByText('About')];
		},
		selectCallbacks: [cb1, cb2],
	};
}
