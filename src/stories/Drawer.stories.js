import React from 'react';
import MuiDrawer from '../components/common/Drawer/index';

const component = {
	title: 'Navigation/Drawer',
	component: MuiDrawer,
	argTypes: {
		direction: {
			control: 'select',
			options: ['right', 'left', 'top', 'bottom'],
		},
	},
	args: { direction: 'right' },
};

export default component;

const Template = (args) =>
	<MuiDrawer { ...args }/>;

export const Drawer = Template.bind({});

Drawer.args = {
	value: true,
	sx: { width: '200px' },
	data: [
		{ text: 'Inbox', icon: 'Add', typography: 5 },
		{ text: 'starred', icon: 'Delete', typography: 3 },
	],
};
