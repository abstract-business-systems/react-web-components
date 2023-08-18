import React from 'react';
import MuiButton from '../components/common/Button';
import * as icons from '@mui/icons-material';
import { keys } from '@laufire/utils/lib';

const component = {
	title: 'Inputs/Button',
	component: MuiButton,
	argTypes: {
		color: {
			type: 'select', options: ['inherit',
				'primary',
				'secondary',
				'success',
				'error',
				'info',
				'warning'],
		},
		variant: {
			control: 'select',
			options: ['contained', 'outlined', 'text', 'filled'],
		},
		startIcon: {
			control: 'select',
			options: keys(icons),
		},
	},
	args: { color: 'success', variant: 'contained', startIcon: 'Delete' },
};

export default component;

const Template = (args) => <MuiButton { ...args }/>;

export const Button = Template.bind({});

Button.args = {
	children: 'HI',
	size: 'large',
	disabled: false,
	disableElevation: true,
	fullWidth: false,
	href: 'https://mui.com/material-ui/react-button/',
	disableFocusRipple: true,
	disableRipple: false,
	sx: { border: '10px solid black' },
};
