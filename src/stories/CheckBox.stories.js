import { React, useEffect, useState } from 'react';
import MuiCheckBox from '../stories/common/CheckBox';

const component = {
	title: 'Inputs/CheckBox',
	component: MuiCheckBox,
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'standard', 'outlined'],
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
		<MuiCheckBox { ...{
			onChange: (evt) => setValue(evt.target.value),
			checked: value,
			...rest,
		} }
		/>);
};

export const CheckBox = Template.bind({});

CheckBox.args = {
	disabled: false,
	disableRipple: false,
	size: 'small',
	sx: {},
	value: false,
};
