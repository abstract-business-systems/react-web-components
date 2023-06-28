import React, { useState } from 'react';
import MuiInput from '../stories/common/Input';

const component = {
	title: 'Inputs/Input',
	component: MuiInput,
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'standard', 'outlined'],
		},
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
		type: {
			control: 'select',
			options: ['date',
				'time',
				'password',
				'number',
				'string',
				'datetime-local',
				'color',
				'file'],
		},
	},
	args: { color: 'primary', variant: 'filled', type: 'password' },
};

export default component;

const Template = (args) => {
	const { value: initialValue } = args;
	const [value, setValue] = useState(initialValue);

	return (
		<MuiInput { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...args,
		} }
		/>);
};

export const Input = Template.bind({});

Input.args = {
	label: 'Required',
	required: true,
	disabled: false,
	helperText: 'Some important message',
	error: false,
	focused: true,
	placeholder: 'Enter some value',
	fullWidth: false,
	margin: 'none',
	size: 'small',
	adornments: {
		startAdornment: {
			text: '',
			icon: 'Delete',
			position: 'start',
		},
		endAdornment: {
			text: 'kg',
			icon: '',
			position: 'end',
		},
	},
	value: '',
};
