import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import MuiTabContext from '@mui/lab/TabContext';
import TabButtons from './TabButton';
import { map } from '@laufire/utils/collection';

const TabContext = (args) => {
	const { data, value } = args;

	return <MuiTabContext value={ value }>
		<TabButtons { ...args }/>
		{ map(data, (content, key) =>
			<TabPanel key={ key } value={ content.value }>
				{ content.component }
			</TabPanel>) }
	</MuiTabContext>;
};

export default TabContext;
