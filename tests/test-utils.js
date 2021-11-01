import * as React from 'react';
import { render as tlRender, fireEvent } from '@testing-library/react';

export * from '@testing-library/react';
export * from 'jest-axe';

/**
 * render
 * @param {Document | Node | Element | Window} element
 * @param {Object} [options={}]
 * @returns
 */
export function render(element, options = {}) {
	const {
		baseElement,
		strict = false,
		// eslint-disable-next-line no-unused-vars
		wrapper: InnerWrapper = React.Fragment,
	} = options;

	// eslint-disable-next-line no-unused-vars
	const Mode = strict ? React.StrictMode : React.Fragment;

	const Wrapper = ({ children }) => (
		<Mode>
			<InnerWrapper>{children}</InnerWrapper>
		</Mode>
	);

	const result = tlRender(element, {
		baseElement,
		wrapper: Wrapper,
	});

	// NOTE(joel): Seen at https://github.com/mui-org/material-ui
	result.setProps = function setProps(props) {
		result.rerender(React.cloneElement(element, props));
		return result;
	};

	result.forceUpdate = function forceUpdate() {
		result.rerender(
			React.cloneElement(element, {
				'data-force-update': String(Math.random()),
			}),
		);
		return result;
	};

	return result;
}

////////////////////////////////////////////////////////////////////////////////

export function simulateMouseClick(element) {
	fireEvent.pointerDown(element, { pointerType: 'mouse' });
	fireEvent.mouseDown(element);
	fireEvent.pointerUp(element, { pointerType: 'mouse' });
	fireEvent.mouseUp(element);
	fireEvent.click(element);
}

export function simulateSpaceKeyClick(element, opts) {
	let { fireClick } = opts || {};
	fireEvent.keyDown(element, { key: ' ' });
	fireEvent.keyUp(element, { key: ' ' });
	if (fireClick) {
		fireEvent.click(element);
	}
}

export function simulateEnterKeyClick(element, opts) {
	let { fireClick } = opts || {};
	fireEvent.keyDown(element, { key: 'Enter' });
	fireEvent.keyUp(element, { key: 'Enter' });
	if (fireClick) {
		fireEvent.click(element);
	}
}
