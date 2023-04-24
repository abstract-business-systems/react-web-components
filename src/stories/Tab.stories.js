import React from 'react';
import MuiTab from './common/Tab/index';

const component = {
	title: 'Navigation/Tab',
	component: MuiTab,
	argTypes: {
		style: {
			control: {
				type: 'select',
				options: ['iconOnly', 'textOnly', 'iconAndText'],
			},
		},
		orientation: {
			control: {
				type: 'select',
				options: ['vertical', 'horizontal'],
			},
		},
	},
};

export default component;

export const Tab = (args) => <MuiTab { ...args }/>;

Tab.args = {
	orientation: 'vertical',
	color: 'secondary', variant: 'scrollable',
	fullWidth: true,
	centered: true,
	contents: {
		todoPane: {
			label: 'TodoPane',
			component: 'Button',
			icon: 'Favorite',
		},
		taskPane: {
			label: 'TaskPane',
			component: 'CheckBox',
			icon: 'Star',
		},
	},
	style: 'iconAndText',
	value: 'todoPane',
	dir: 'rtl',
};
