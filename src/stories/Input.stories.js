import React from 'react';
import MuiInput from '../stories/common/Input';

const component = {
	title: 'Inputs/Input',
	component: MuiInput,
};

export default component;

const Template = (args) => {
	const [value, setValue] = React.useState(1);

	return (
		<MuiInput { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...args,
		} }
		/>);
};

export const Input = Template.bind({});

// Todo: On toggle select control the end adornments top of dropdown icon.
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
	select: false,
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
