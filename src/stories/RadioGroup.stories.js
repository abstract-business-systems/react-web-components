import React, { useEffect, useState } from 'react';
import MuiRadioGroup from './common/RadioGroup';

const component = {
	title: 'Inputs/RadioGroup',
	component: MuiRadioGroup,
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<MuiRadioGroup { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...rest,
		} }
		/>);
};

export const RadioGroup = Template.bind({});

RadioGroup.args = {
	sx: {},
	options: ['ten', 'twenty', 'thirty'],
	value: 'ten',
};
