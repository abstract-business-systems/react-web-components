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

export const Select = (args) => {
	const { value: initialValue, ...rest } = args;
	const [userInput, setUserInput] = useState(initialValue);

	return (
		<MuiSelect { ...{
			onChange: ({ target: { value }}) =>
				setUserInput(typeof value === 'string'
					? value.split(',')
					: value),
			value: userInput,
			...rest,
		} }
		/>);
};

Select.args = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	multiple: true,
	sx: { width: 300 },
	disableUnderline: false,
	value: [],
};
