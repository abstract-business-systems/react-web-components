import React from 'react';
import { Button as MuiButton } from '@mui/material';
import getIcons from '../common/helper/getIcons';

const Button = ({
	children = 'Button', variant = 'contained',
	startIcon, endIcon, ...rest
}) =>
	<MuiButton { ...{ variant, ...rest, ...getIcons({ startIcon, endIcon }) } }>
		{ children }
	</MuiButton>;

export default Button;
