import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from './helper/buildEvent';

const Slider = (args) => {
	const { value: initialValue, onChange = nothing, ...rest } = args;

	return (
		<MuiSlider { ...{
			value: initialValue,
			onChange: ({ target: { value }}) =>
				onChange(buildEvent({ value })),
			...rest,
		} }
		/>);
};

export default Slider;
