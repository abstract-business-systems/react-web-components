import React from 'react';
import MuiDrawer from './common/Drawer/index';

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

const Template = (args) => {
	const { value, lists, sx, direction } = args;

	return (
		<MuiDrawer { ...{
			value,
			lists, sx, direction,
		} }
		/>);
};

export const Drawer = Template.bind({});

Drawer.args = {
	value: true,
	sx: { width: '200px' },
	lists: [
		{ text: 'Inbox', icon: 'Add', typography: 5 },
		{ text: 'starred', icon: 'Delete', typography: 3 },
	],
};
