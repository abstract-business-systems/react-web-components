import React, { useEffect, useState } from 'react';
import MuiSlider from '../components/common/Slider';

const ten = 10;
const twenty = 20;
const thirty = 30;

const component = {
	title: 'Inputs/Slider',
	component: MuiSlider,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
		},
		size: {
			control: 'radio',
			options: ['medium', 'large', 'small'],
		},
		valueLabelDisplay: {
			control: 'radio',
			options: ['auto', 'on', 'off'],
		},
	},
	args: {
		color: 'success', orientation: 'horizontal',
		size: 'medium', valueLabelDisplay: 'auto',
	},
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
	min: 0,
	max: 100,
	step: 10,
	sx: { width: '30%' },
	valueLabelDisplay: 'auto',
	value: 10,
};

export const MultiSlider = Template.bind({});

MultiSlider.args = {
	min: 0,
	max: 100,
	step: 10,
	sx: { width: '30%' },
	valueLabelDisplay: 'auto',
	value: [ten, twenty, thirty],
};
