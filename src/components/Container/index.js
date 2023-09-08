/* eslint-disable max-lines-per-function */
/* eslint-disable no-magic-numbers */
import React, { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Box } from '@mui/material';
import '../../stories/styles/global.scss';
import clsx from 'clsx';
import { identity } from '@laufire/utils/fn';
import { map } from '@laufire/utils/collection';
import shortcut from '../common/helper/shortcut';
import buildEvent from '../common/helper/buildEvent';

const getArgs = ({ className, ...args }) => ({
	...args, tabIndex: '-1',
	style: { height: '1000px', overflow: 'auto' },
	className: clsx('absContainer', className),
});

// eslint-disable-next-line max-lines-per-function
const Container = ({
	onChange = identity, children,
	shortcuts = [], resize, ...args
}) => {
	const ref = useRef();
	const { width, height } = useResizeDetector({ targetRef: ref, ...resize });

	const handleChange = () => {
		const { current }	= ref;
		const orientation = width < height ? 'portrait' : 'landscape';
		const {
			scrollHeight,
			scrollWidth,
			scrollTop,
			scrollLeft,
			clientWidth,
			clientHeight,
		} = current;

		onChange(buildEvent({
			value: {
				width: width || clientWidth,
				height: height || clientHeight,
				orientation: orientation,
				scroll: {
					width: scrollWidth,
					height: scrollHeight,
					x: scrollLeft,
					y: scrollTop,
				},
			},
		}));
	};

	useEffect(() => {
		handleChange();
		const { current: element } = ref;

		window.addEventListener('resize', handleChange);
		element.addEventListener('scroll', handleChange);
		map(shortcuts, (cb, key) => shortcut.createShortcut({ cb, key, ref }));
	}, []);

	return (
		<Box ref={ ref } { ...getArgs(args) }>
			{ children }
		</Box>
	);
};

export default Container;
