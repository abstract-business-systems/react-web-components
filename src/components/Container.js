import React, { useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Box } from '@mui/material';
import '../stories/styles/global.scss';
import clsx from 'clsx';
import { identity } from '@laufire/utils/fn';
import { map } from '@laufire/utils/collection';
import shortcut from './common/helper/shortcut';
import buildEvent from './common/helper/buildEvent';

const getArgs = ({ className, ...args }) => ({
	...args, tabIndex: '-1',
	className: clsx('absContainer', className),
});

const Container = ({
	onChange = identity, children,
	shortcuts = [], resize, ...args
}) => {
	const ref = useRef();
	const { width, height } = useResizeDetector({ targetRef: ref, ...resize });

	useEffect(() => {
		const orientation = width > height ? 'portrait' : 'landscape';

		width && onChange(buildEvent({ value: { width, height, orientation }}));
	}, [width, height]);

	useEffect(() => {
		map(shortcuts, (cb, key) => shortcut.createShortcut({ cb, key, ref }));
	}, []);

	return (
		<Box ref={ ref } { ...getArgs(args) }>
			{ children }
		</Box>
	);
};

export default Container;
