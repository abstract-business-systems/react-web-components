import { Box, Drawer as MuiDrawer } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import DrawerButton from './DrawerButton';
import DrawerList from './DrawerList';

const Drawer = ({ direction, lists }) => {
	// Todo: Does all the direction require in state.
	const [anchor, setAnchor] = useState({
		left: false,
		right: false,
		bottom: false,
		top: false,
	});

	return (
		<Box>
			<DrawerButton { ...{ setAnchor, anchor, direction } }/>
			<MuiDrawer
				anchor={ direction }
				open={ anchor[direction] }
				onClose={ () => setAnchor({ ...anchor, [direction]: false }) }
			>
				<DrawerList { ...{ direction, lists, anchor, setAnchor } }/>
			</MuiDrawer>
		</Box>
	);
};

export default Drawer;

Drawer.prototype = {
	context: PropTypes.object,
	trigger: PropTypes.object,
};
