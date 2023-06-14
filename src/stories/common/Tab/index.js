import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TabContext from './TabContext';
import buildEvent from '../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const tabStyle = {
	vertical: 'vertical-tab',
	horizontal: 'horizontal-tab',
};

const Tab = (props) => {
	const {
		orientation, dir,
		value: initialValue, onChange = nothing,
	} = props;

	const [value, selectValue] = useState(initialValue);
	const onClick = (tabKey) => {
		selectValue(tabKey);
		onChange(buildEvent({ newValue: tabKey }));
	};

	return (
		<Box dir={ dir } className={ tabStyle[orientation] }>
			<TabContext { ...{ props, onClick, value } }/>
		</Box>
	);
};

export default Tab;
