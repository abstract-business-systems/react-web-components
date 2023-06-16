import React from 'react';
import MuiSpeedDial from '../stories/common/SpeedDial';

const component = {
	title: 'Navigation/SpeedDial',
	component: MuiSpeedDial,
	argTypes: {
		direction: {
			type: 'select',
			options: ['up', 'down', 'left', 'right'],
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
	},
	args: {
		hidden: false,
		tooltipOpen: true,
		direction: 'up',
		tooltipPlacement: 'top',
	},
};

export default component;

const Template = (args) => <MuiSpeedDial { ...args }/>;

export const SpeedDial = Template.bind({});

SpeedDial.args = {
	trigger: { children: { text: 'SpeedDialIcon' }},
	data: [
		{ icon: 'Save', children: 'Save' },
		{ icon: 'Print', children: 'Print' },
		{ icon: 'Share', children: 'Share' },
	],
	icon: 'Delete',
};
