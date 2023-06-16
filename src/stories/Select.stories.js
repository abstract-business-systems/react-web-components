import React, { useState } from 'react';
import MuiSelect from '../stories/common/Select';
import { peek } from '@laufire/utils/debug';

const component = {
	title: 'Inputs/Select',
	component: MuiSelect,
};

export default component;

export const Select = (args) => {
	const { value: initialValue, ...rest } = args;

	peek(args);
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
	variant: 'standard',
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
