import React from 'react';
import { Button as MuiButton } from '@mui/material';
import getIcons from './helper/getIcons';

const Button = ({ children = 'Button', startIcon, endIcon, ...rest }) =>
	<MuiButton { ...{ ...rest, ...getIcons({ startIcon, endIcon }) } }>
		{ children }
	</MuiButton>;

export default Button;
