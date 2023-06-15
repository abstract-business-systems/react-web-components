import { Box, Drawer as MuiDrawer } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import DrawerList from './DrawerList';

const Drawer = ({ direction, lists, value, sx }) =>
	<Box>
		<MuiDrawer
			anchor={ direction }
			open={ value }
		>
			<DrawerList { ...{ lists, value, sx } }/>
		</MuiDrawer>
	</Box>
	;

export default Drawer;

Drawer.prototype = {
	context: PropTypes.object,
	trigger: PropTypes.object,
};
