import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from './helper/buildEvent';

const Slider = ({ value: initialValue, onChange = nothing, ...rest }) =>
	<MuiSlider { ...{
		value: initialValue,
		onChange: ({ target: { value }}) =>
			onChange(buildEvent({ value })),
		...rest,
	} }
	/>;

export default Slider;
