import { React, useEffect, useState } from 'react';
import MuiSlider from './common/Slider';

const component = {
	title: 'Inputs/Slider',
	component: MuiSlider,
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	return (
		<MuiSlider { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...rest,
		} }
		/>);
};

export const Slider = Template.bind({});

Slider.args = {
	size: 'large',
	color: 'success',
	min: 0,
	max: 100,
	step: 10,
	sx: { width: '30%' },
	valueLabelDisplay: 'auto',
	value: 10,
};
