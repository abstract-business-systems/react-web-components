import React from 'react';
import { Drawer as MuiDrawer } from '@mui/material';
import DrawerList from './DrawerList';

const Drawer = (args) => {
	const { direction = 'right', value = 'false' } = args;

	return (
		<MuiDrawer
			anchor={ direction }
			open={ value }
		>
			<DrawerList { ...args }/>
		</MuiDrawer>);
};

export default Drawer;
