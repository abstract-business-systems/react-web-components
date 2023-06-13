import { nothing } from '@laufire/utils/fn';
import { Slider as MuiSlider } from '@mui/material';
import { React } from 'react';

const Slider = (context) => {
	const { sx, value, onChange = nothing, ...args } = context;

	return (
		<MuiSlider { ...{
			sx: sx,
			value: value,
			// Todo: Fix the onChange value.
			onChange: (evt) => onChange(evt),
			...args,
		} }
		/>);
};

export default Slider;
