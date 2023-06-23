import { Button as MuiButton } from '@mui/material';
import * as React from 'react';
import IconButton from './IconButton';
import { filter, map } from '@laufire/utils/collection';
import { isDefined } from '@laufire/utils/reflection';

const Icon = (icons) => {
	const Icons = filter(icons, isDefined);

	return map(Icons, (icon) =>
		<IconButton icon={ icon }/>);
};

const Button = ({ children = 'Button', startIcon, endIcon, ...rest }) =>
	<MuiButton { ...{ ...rest, ...Icon({ startIcon, endIcon }) } }>
		{ children }
	</MuiButton>;

export default Button;
