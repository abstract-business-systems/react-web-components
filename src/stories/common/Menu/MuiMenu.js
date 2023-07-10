import React from 'react';
import { Menu } from '@mui/material';
import MenuItems from './MenuItems';

const getOrigin = ({
	transformHorizontal = 'left', transformVertical = 'top',
	anchorVertical = 'left', anchorHorizontal = 'top',
}) => ({
	anchorOrigin: {
		vertical: anchorVertical,
		horizontal: anchorHorizontal,
	},
	transformOrigin: {
		vertical: transformVertical,
		horizontal: transformHorizontal,
	},
});

const MuiMenu = (args) => {
	const { handleClose, anchorEl	} = args;

	return (
		<Menu { ...{
			anchorEl: anchorEl,
			open: Boolean(anchorEl),
			onClose: handleClose,
			...getOrigin(args),
		} }
		>
			<MenuItems { ...args }/>
		</Menu>);
};

export default MuiMenu;
