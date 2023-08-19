import React, { useState } from 'react';
import { Box } from '@mui/material';
import MuiMenu from './MuiMenu';
import Button from '../Button';

const Menu = (args) => {
	const { trigger: { children: { text }}} = args;
	const [anchorEl, setAnchorEl] = useState(null);
	const handleClose = () => {
		setAnchorEl(null);
	};

	return <Box>
		<Button { ...{
			children: text,
			onClick: (event) => setAnchorEl(event.currentTarget),
		} }
		/>
		<MuiMenu { ...{ ...args, handleClose, setAnchorEl, anchorEl } }/>
	</Box>;
};

export default Menu;
