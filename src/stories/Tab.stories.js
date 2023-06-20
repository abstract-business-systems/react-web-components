import React from 'react';
import MuiTab from './common/Tab/index';

const component = {
	title: 'Navigation/Tab',
	component: MuiTab,
	argTypes: {
		type: {
			control: 'select',
			options: ['iconOnly', 'textOnly', 'iconAndText'],
		},
		orientation: {
			control: 'radio',
			options: ['vertical', 'horizontal'],
		},
		color: {
			control: 'select',
			options: ['secondary', 'primary'],
		},
	},
	args: {
		type: 'iconAndText',
		orientation: 'vertical',
		color: 'secondary',
	},
};

export default component;

export const Tab = (args) => <MuiTab { ...args }/>;
Tab.args = {
	fullWidth: true,
	centered: true,
	contents: {
		todoPane: {
			label: 'TodoPane',
			component: 'Button',
			prop: { children: 'click me!' },
			icon: 'Favorite',
		},
		taskPane: {
			label: 'TaskPane',
			component: 'Checkbox',
			prop: { value: true },
			icon: 'Star',
		},
	},
	value: 'todoPane',
	direction: 'rtl',
};
