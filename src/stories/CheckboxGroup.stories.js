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
	options: ['US', 'RUSSIA', 'INDIA'],
	value: ['US'],
};
