import React, { useState } from 'react';
import '../../styles/global.scss';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../helper/buildEvent';
import TabContext from './TabContext';

const tabStyle = { vertical: 'absTab-vertical' };

const Tab = (props) => {
	const {
		orientation, direction, className,
		value: initialValue, onChange = nothing,
	} = props;

	const [value, selectValue] = useState(initialValue);
	const onClick = (tabKey) => {
		selectValue(tabKey);
		onChange(buildEvent({ value: tabKey }));
	};
	const dir = direction === 'right' ? 'rtl' : 'ltr';

	return (
		<Box dir={ dir } className={ clsx(tabStyle[orientation], className) }>
			<TabContext { ...{ props, onClick, value } }/>
		</Box>
	);
};

export default Tab;
