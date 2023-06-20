import React from 'react';
import MuiIconButton from './common/IconButton';
import * as icons from '@mui/icons-material';
import { keys } from '@laufire/utils/lib';

const component = {
	title: 'Inputs/IconButton',
	component: MuiIconButton,
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
		icon: {
			control: 'select',
			options: keys(icons),
		},
	},
	args: { color: 'success', icon: 'Delete' },
};

export default component;

const Template = (args) => <MuiIconButton { ...args }/>;

export const IconButton = Template.bind({});

IconButton.args = {
	size: 'large',
	disabled: false,
	href: 'https://mui.com/material-ui/react-button/',
	sx: { border: '10px solid black' },
};
