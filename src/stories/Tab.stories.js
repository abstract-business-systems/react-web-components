import React from 'react';
import MuiTab from './common/Tab/index';
import Button from './common/Button';
import Checkbox from './common/Checkbox';

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
