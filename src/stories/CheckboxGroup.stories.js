import React from 'react';
import MuiCheckboxGroup from './common/CheckboxGroup.js';

const component = {
	title: 'Inputs/CheckboxGroup',
	component: MuiCheckboxGroup,
};

export default component;

const Template = (args) =>
	<MuiCheckboxGroup { ...args }/>;

export const CheckboxGroup = Template.bind({});

CheckboxGroup.args = {
	disabled: false,
	options: [
		{
			value: 'us',
			label: 'US',
		},
		{
			value: 'russia',
			label: 'RUSSIA',
		},
		{
			value: 'india',
			label: 'INDIA',
		},
	],
	value: ['us'],
};
