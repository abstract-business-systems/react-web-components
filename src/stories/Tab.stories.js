import React from 'react';
import MuiTab from '../components/Tab/index';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

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
		textColor: {
			control: 'select',
			options: ['secondary', 'primary'],
		},
		indicatorColor: {
			control: 'select',
			options: ['secondary', 'primary', 'inherit'],
		},
	},
	args: {
		type: 'iconAndText',
		orientation: 'vertical',
		textColor: 'secondary',
		indicatorColor: 'inherit',
	},
};

export default component;

export const Tab = (args) => <MuiTab { ...args }/>;
Tab.args = {
	fullWidth: true,
	centered: true,
	data: {
		todoPane: {
			label: 'TodoPane',
			component: <Button { ...{ children: 'ClickMe!' } }/>,
			icon: 'Favorite',
		},
		taskPane: {
			label: 'TaskPane',
			component: <Checkbox { ...{ value: true } }/>,
			icon: 'Star',
		},
	},
	value: 'todoPane',
	direction: 'rtl',
};
