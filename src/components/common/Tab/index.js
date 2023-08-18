import React from 'react';
import '../../../stories/styles/global.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../helper/buildEvent';
import TabContext from './TabContext';
import useFollowState from '../hook/useFollowState';

const tabStyle = { vertical: 'absTab-vertical' };

const Tab = (props) => {
	const {
		orientation, direction, className,
		value: initialValue, onChange = nothing,
	} = props;

	const handleClick = ({ curValue }) =>
		onChange(buildEvent({ value: curValue }));

	const [value, setValue] = useFollowState(initialValue, handleClick);

	const dir = direction === 'right' ? 'rtl' : 'ltr';

	return (
		<Box dir={ dir } className={ clsx(tabStyle[orientation], className) }>
			<TabContext { ...{ ...props, setValue, value } }/>
		</Box>
	);
};

export default Tab;
