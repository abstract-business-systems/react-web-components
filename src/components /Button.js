/* eslint-disable no-console */
import { Button as MuiButton } from '@mui/material';
import * as React from 'react';
import * as Icons from '@mui/icons-material';

const Icon = ({ props: { startIcon, endIcon }}) => {
	const StartIcon = Icons[startIcon];
	const EndIcon = Icons[endIcon];

	return {
		startIcon: startIcon ? <StartIcon/> : '',
		endIcon: endIcon ? <EndIcon/> : '',
	};
};

const Button = (context) => {
	const { props: { args }} = context;

	return (
		<MuiButton
			{ ...{ ...args, ...Icon(context) } }
			onClick={ () => console.log('clicked') }
		/>);
};

export default Button;
