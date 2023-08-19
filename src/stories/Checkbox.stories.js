import React, { useEffect, useState } from 'react';
import MuiCheckbox from '../components/Checkbox';

const component = {
	title: 'Inputs/Checkbox',
	component: MuiCheckbox,
	argTypes: {
		color: {
			type: 'select', options: ['inherit',
				'primary',
				'secondary',
				'success',
				'error',
				'info',
				'warning'],
		},
	},
	args: { color: 'primary' },
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<MuiCheckbox { ...{
			onChange: (evt) => setValue(evt.target.value),
			checked: value,
			...rest,
		} }
		/>);
};

export const Checkbox = Template.bind({});

Checkbox.args = {
	disabled: false,
	disableRipple: false,
	size: 'small',
	sx: {},
	value: false,
};
