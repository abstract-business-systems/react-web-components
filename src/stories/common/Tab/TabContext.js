import * as React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import MuiTabContext from '@mui/lab/TabContext';
import TabButtons from './TabButton';
import { map, values } from '@laufire/utils/collection';

const TabContext = ({ props, onClick, value }) => {
	const { contents } = props;

	return <MuiTabContext value={ value }>
		<TabButtons { ...{ ...props, value, onClick } }/>
		{ values(map(contents, (content, key) => {
			const Child = content.component;

			return <TabPanel key={ key } value={ key }>
				{ Child }
			</TabPanel>;
		})) }
	</MuiTabContext>;
};

export default TabContext;
