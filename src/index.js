import { forwardRef, Fragment, useMemo } from 'react';
import { Popover } from '@react-lit/popover';
import {
	DropdownProvider,
	useDropdownItem,
	useDropdownItems,
	useDropdownPopover,
	useDropdownTrigger,
	useDropdownContext,
} from '@react-lit/dropdown';
import { noop } from '@react-lit/helper';

////////////////////////////////////////////////////////////////////////////////

/**
 * Menu is the wrapper component for the other components.
 * No DOM element is rendered.
 */
export const Menu = forwardRef(
	({ as: Comp = Fragment, id, children, style, ...rest }, parentRef) => {
		const parentIsFragment = useMemo(() => {
			try {
				// NOTE(joel): To test if the component renders a fragment we need to
				// actually render it, but this may throw an error since we can't
				// predict what is actually provided. There's technically a small
				// chance that this could get it wrong but I don't think it's too
				// likely in practice.
				return Comp == Fragment;
			} catch (err) {
				return false;
			}
		}, [Comp]);

		const props = parentIsFragment
			? {}
			: {
					ref: parentRef,
					id,
					style: { position: 'relative', ...style },
					...rest,
			  };
		return (
			<Comp {...props}>
				<DropdownProvider id={id} children={children} />
			</Comp>
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuButton wraps a DOM `button` that toggles the opening and closing of the
 * dropdown menu. Must be rendered inside of a `<Menu>`.
 */
export const MenuButton = forwardRef(
	({ as: Comp = 'button', ...rest }, parentRef) => {
		let {
			data: { isExpanded, controls },
			props,
		} = useDropdownTrigger({ ...rest, ref: parentRef });

		return (
			<Comp
				aria-expanded={isExpanded ? true : undefined}
				aria-haspopup
				aria-controls={controls}
				{...props}
			/>
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuItemImpl is the base implementation of a `MenuItem` or `MenuLink`.
 */
export const MenuItemImpl = forwardRef(
	({ as: Comp = 'div', style, ...rest }, parentRef) => {
		let {
			data: { disabled },
			props,
		} = useDropdownItem({ ...rest, ref: parentRef });

		const { isLink } = rest;

		return (
			<Comp
				role="menuitem"
				{...props}
				aria-disabled={disabled || undefined}
				style={{
					display: 'block',
					userSelect: 'none',
					cursor: 'pointer',
					...(isLink ? { textDecoration: 'initial' } : {}),
					...style,
				}}
			/>
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuItem handles menu selection. Must be a direct child of a `<MenuList>`.
 */
export const MenuItem = forwardRef(({ as = 'div', ...props }, parentRef) => (
	<MenuItemImpl {...props} ref={parentRef} as={as} />
));

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuItems is a low-level wrapper for menu items.
 * Compose it with `MenuPopover` for more control over the nested components
 * and their rendered DOM nodes, or if you need to nest arbitrary components
 * between the outer wrapper and your list.
 */
export const MenuItems = forwardRef(
	({ as: Comp = 'div', ...rest }, parentRef) => {
		let {
			data: { activeDescendant, triggerId },
			props,
		} = useDropdownItems({ ...rest, ref: parentRef });

		return (
			<Comp
				aria-activedescendant={activeDescendant}
				aria-labelledby={triggerId || undefined}
				role="menu"
				{...props}
			/>
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuLink handles linking to a different page in the menu. By default it
 * renders `<a>`, but also accepts any other kind of Link as long as the `Link`
 * uses the `React.forwardRef` API.
 * Must be a direct child of a `<MenuList>`.
 */
export const MenuLink = forwardRef(
	({ as = 'a', onSelect, ...props }, parentRef) => (
		<MenuItemImpl
			{...props}
			ref={parentRef}
			as={as}
			isLink
			onSelect={onSelect || noop}
		/>
	),
);

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuList wraps a DOM element that renders the menu items. Must be rendered
 * inside of a `<Menu>`.
 */
export const MenuList = forwardRef(({ portal = true, ...props }, parentRef) => (
	<MenuPopover portal={portal}>
		<MenuItems {...props} ref={parentRef} />
	</MenuPopover>
));

////////////////////////////////////////////////////////////////////////////////

/**
 * MenuPopover is a low-level wrapper for the popover that appears when a menu
 * button is open.
 */
export const MenuPopover = forwardRef(
	({ as: Comp = 'div', style, ...rest }, parentRef) => {
		let {
			data: { portal, targetRef, position },
			props,
		} = useDropdownPopover({ ...rest, ref: parentRef });

		const { hidden } = props;
		const sharedStyles = {
			display: hidden ? 'none' : 'block',
			position: 'absolute',
			...style,
		};

		return portal ? (
			<Popover
				{...props}
				style={sharedStyles}
				as={Comp}
				targetRef={targetRef}
				position={position}
			/>
		) : (
			<Comp {...props} style={sharedStyles} />
		);
	},
);

////////////////////////////////////////////////////////////////////////////////

/**
 * A hook that exposes data for a given `Menu` component to its descendants.
 */
export function useMenuButtonContext() {
	let {
		state: { isExpanded },
	} = useDropdownContext();
	return useMemo(() => ({ isExpanded }), [isExpanded]);
}
