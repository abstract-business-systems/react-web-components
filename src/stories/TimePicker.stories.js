import React, { useState } from 'react';
import MuiTimePicker from '../components/common/TimePicker';

const component = {
	title: 'Inputs/TimePicker',
	component: MuiTimePicker,
};

export default component;

const Template = (args) => {
	const { value: initialValue } = args;
	const [value, setValue] = useState(initialValue);

	return (
		<MuiTimePicker { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...args,
		} }
		/>);
};

export const TimePicker = Template.bind({});

TimePicker.args = { value: '13:00:00' };
