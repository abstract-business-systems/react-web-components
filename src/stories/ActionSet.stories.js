import React from 'react';
import MuiActionSet from '../stories/common/ActionSet';

const component = {
	title: 'Navigation/ActionSet',
	component: MuiActionSet,
	argTypes: {
		direction: {
			type: 'select',
			options: ['up', 'down', 'left', 'right'],
		},
		type: {
			type: 'select',
			options: ['menu', 'speedDial'],
		},
		tooltipPlacement: {
			type: 'select',
			options: ['bottom-end',
				'bottom-start',
				'bottom',
				'left-end',
				'left-start',
				'left',
				'right-end',
				'right-start',
				'right',
				'top-end',
				'top-start',
				'top'],
		},
		hidden: {
			type: Boolean,
			options: [true, false],
		},
		tooltipOpen: { type: Boolean, options: [true, false] },
		vertical: {
			control: 'radio',
			options: ['top', 'center', 'bottom'],
		},
		horizontal: {
			control: 'radio',
			options: ['left', 'center', 'right'],
		},
		transformVertical: {
			control: 'radio',
			options: ['top', 'center', 'bottom'],
		},
		transformHorizontal: {
			control: 'radio',
			options: ['left', 'center', 'right'],
		},
	},
	args: {
		hidden: false,
		tooltipOpen: true,
		type: 'menu',
		tooltipPlacement: 'left',
		direction: 'up',
		vertical: 'top',
		horizontal: 'center',
		transformVertical: 'top',
		transformHorizontal: 'left',
	},
};

export default component;

const Template = (args) => <MuiActionSet { ...args }/>;

export const ActionSet = Template.bind({});

ActionSet.args = {
	type: 'menu',
	trigger: { children: { text: 'Speed Dial Icon' }},
	data: [
		{ icon: 'Save', children: 'Save' },
		{ icon: 'Print', children: 'Print' },
		{ icon: 'Share', children: 'Share' },
	],
	sx: {
		'width': '200px',
		'&:active': { color: 'primary.main' },
		'&:hover': { backgroundColor: '#e3f2fd' },
	},
	vertical: 'top',
	horizontal: 'right',
	transformVertical: 'top',
	transformHorizontal: 'left',
};
