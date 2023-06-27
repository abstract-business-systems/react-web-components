import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import * as icons from '@mui/icons-material';

const IconButton = (args) => {
	const { icon, ...rest } = args;
	const Icon = icons[icon];

	return <MuiIconButton { ...rest }>
		<Icon/>
	</MuiIconButton>;
};

export default IconButton;
