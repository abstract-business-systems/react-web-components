import { React, useState } from 'react';
import MuiInput from '../stories/common/Input';

const component = {
	title: 'Inputs/Input',
	component: MuiInput,
};

export default component;

const Template = (args) => {
	const [value, setValue] = useState(1);

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
	variant: 'filled',
	label: 'Required',
	required: true,
	disabled: false,
	type: 'password',
	helperText: 'Some important message',
	error: false,
	focused: false,
	placeholder: 'Enter some value',
	fullWidth: false,
	margin: 'none',
	size: 'small',
	adornments: {
		start: {
			text: '',
			icon: 'Delete',
		},
		end: {
			text: 'kg',
			icon: '',
		},
	},
};
