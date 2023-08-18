import React, { useEffect, useState } from 'react';
import MuiRadioGroup from '../components/common/RadioGroup';

const component = {
	title: 'Inputs/RadioGroup',
	component: MuiRadioGroup,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
		labelPlacement: {
			control: 'select',
			options: ['top', 'start', 'end', 'bottom'],
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},
	},
	args: { color: 'primary', labelPlacement: 'end', orientation: 'vertical' },
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<MuiRadioGroup { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...rest,
		} }
		/>);
};

export const RadioGroup = Template.bind({});

RadioGroup.args = {
	sx: {},
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
	value: 'us',
	disabled: false,
};
