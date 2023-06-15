import { Menu } from '@mui/material';
import * as React from 'react';
import MenuItems from './MenuItems';

const MuiMenu = ({ args, handleClose, setValue, value: { anchorEl }}) => {
	const {
		transformHorizontal, transformVertical,
		vertical, horizontal, data, sx,
	} = args;

	return (
		<Menu
			anchorEl={ anchorEl }
			open={ Boolean(anchorEl) }
			onClose={ handleClose }
			anchorOrigin={ {
				vertical,
				horizontal,
			} }
			transformOrigin={ {
				vertical: transformVertical,
				horizontal: transformHorizontal,
			} }
		><MenuItems { ...{ data, sx, setValue } }/></Menu>);
};

export default MuiMenu;
