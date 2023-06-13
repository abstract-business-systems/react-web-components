import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MuiMenu from './MuiMenu';
import Content from '../Content';
import Button from '../Button';

const Menu = (args) => {
	const { trigger: { children: { text }}} = args;
	// Todo: why it require two state.
	const [content, setContent] = useState('');
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return <Box>
		<Button { ...{
			children: text,
			onClick: handleClick,
		} }
		/>
		<MuiMenu { ...{ args, handleClose, setContent, anchorEl } }/>
		{ content && <Content { ...{ content } }/> }
	</Box>;
};

export default Menu;

Menu.prototype = { trigger: PropTypes.object };
