import { React, useState } from 'react';
import MuiSlider from './common/Slider';

const component = {
	title: 'Inputs/Slider',
	component: MuiSlider,
};

export default component;

const Template = (args) => {
	const [value, setValue] = useState(0);

	return (
		<MuiSlider { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...args,
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
};
