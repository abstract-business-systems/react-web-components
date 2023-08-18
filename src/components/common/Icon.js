import React from 'react';
import * as icons from '@mui/icons-material';

const Icon = (args) => {
	const { icon, ...rest } = args;
	const MuiIcon = icons[icon];

	return <MuiIcon { ...rest }/>;
};

export default Icon;
