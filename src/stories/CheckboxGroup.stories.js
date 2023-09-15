import React, { useState } from 'react';

import MuiCheckboxGroup from '../components/CheckboxGroup';
const component = {
	title: 'Inputs/CheckboxGroup',
	component: MuiCheckboxGroup,
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	return (
		<MuiCheckboxGroup
			{ ...{
				value: value,
				onChange: (evt) => setValue(evt.target.value),
				...rest,
			} }
		/>);
};

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
