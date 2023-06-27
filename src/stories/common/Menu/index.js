import React, { useState } from 'react';
import { Box } from '@mui/material';
import MuiMenu from './MuiMenu';
import Button from '../Button';

const Menu = (args) => {
	const { trigger: { children: { text }}} = args;
	const [value, setValue] = useState({ content: '', anchorEl: null });
	const handleClick = (event) => {
		setValue((prev) => ({ ...prev, anchorEl: event.currentTarget }));
	};
	const handleClose = () => {
		setValue((prev) => ({ ...prev, anchorEl: null }));
	};

	return <Box>
		<Button { ...{
			children: text,
			onClick: handleClick,
		} }
		/>
		<MuiMenu { ...{ args, handleClose, setValue, value } }/>
		{ value.content && <Button { ...{ children: value.content } }/> }
	</Box>;
};

export default Menu;
