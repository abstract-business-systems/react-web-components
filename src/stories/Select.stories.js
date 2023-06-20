import React, { useState } from 'react';
import MuiSelect from '../stories/common/Select';

const component = {
	title: 'Inputs/Select',
	component: MuiSelect,
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'standard', 'outlined'],
		},
	},
	args: { variant: 'standard' },
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [userInput, setUserInput] = useState(initialValue);

	return (
		<MuiSelect { ...{
			onChange: ({ target: { value }}) =>
				setUserInput(value),
			value: userInput,
			...rest,
		} }
		/>);
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	sx: { width: 300 },
	disableUnderline: false,
	value: 'Ten',
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	multiple: 'true',
	sx: { width: 300 },
	disableUnderline: false,
	value: [],
};
