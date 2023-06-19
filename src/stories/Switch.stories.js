import { React, useEffect, useState } from 'react';
import MuiSwitch from '../stories/common/Switch';

const component = {
	title: 'Inputs/Switch',
	component: MuiSwitch,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
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
		<MuiSwitch { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...rest,
		} }
		/>);
};

export const Switch = Template.bind({});

Switch.args = {
	size: 'large',
	disabled: false,
	value: true,
};
