import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from './helper/buildEvent';

const Slider = (context) => {
	const { value: initialValue, onChange = nothing, ...args } = context;

	return (
		<MuiSlider { ...{
			value: initialValue,
			onChange: ({ target: { value }}) =>
				onChange(buildEvent({ value })),
			...args,
		} }
		/>);
};

export default Slider;
