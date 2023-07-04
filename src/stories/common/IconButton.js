import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import * as icons from '@mui/icons-material';

const IconButton = ({ icon, ...rest }) => {
	const Icon = icons[icon];

	return <MuiIconButton { ...rest }>
		<Icon/>
	</MuiIconButton>;
};

export default IconButton;
