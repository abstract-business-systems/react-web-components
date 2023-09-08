/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import React, { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Box } from '@mui/material';
import '../../stories/styles/global.scss';
import clsx from 'clsx';
import { identity } from '@laufire/utils/fn';
import { map } from '@laufire/utils/collection';
import shortcut from './common/helper/shortcut';
import buildEvent from './common/helper/buildEvent';
import { isDefined } from '@laufire/utils/reflection';

const getArgs = ({ className, ...args }) => ({
	...args, tabIndex: '-1',
	style: { height: '1000px', overflow: 'auto' },
	className: clsx('absContainer', className),
});

const getValue = ({ element, width, height }) => {
	const orientation = width < height ? 'portrait' : 'landscape';
	const {
		scrollHeight,
		scrollWidth,
		scrollTop,
		scrollLeft,
		clientWidth,
		clientHeight,
	} = element;

	return {
		value: {
			width: isDefined(width) ? width : clientWidth,
			height: isDefined(height) ? height : clientHeight,
			orientation: orientation,
			scroll: {
				width: scrollWidth,
				height: scrollHeight,
				x: scrollLeft,
				y: scrollTop,
			},
		},
	};
};

const handleChange = ({ onChange, ...rest }) =>
	onChange(buildEvent({ ...getValue(rest) }));

const addEventListeners = (props) => {
	const { element } = props;

	window.addEventListener('resize', () => handleChange(props));
	element.addEventListener('scroll', () => handleChange(props));
};

const setupShortcuts = ({ shortcuts }) =>
	map(shortcuts, (cb, key) => shortcut.createShortcut({ cb, key, ref }));

const Container = ({
	onChange = identity, onLoad = identity, children,
	shortcuts = [], resize, ...args
}) => {
	const ref = useRef();
	const { width, height } = useResizeDetector({ targetRef: ref, ...resize });

	useEffect(() => {
		const { current: element } = ref;

		onLoad(buildEvent({ ...getValue({ element, width, height }) }));
		addEventListeners({ element, onChange, width, height });
		setupShortcuts({ shortcuts });
	}, []);

	return (
		<Box ref={ ref } { ...getArgs(args) }>
			{ children }
		</Box>
	);
};

export default Container;
