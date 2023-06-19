import { Slider as MuiSlider } from '@mui/material';
import { React } from 'react';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';

const Slider = (context) => {
	const { value: initialValue, onChange = nothing, ...args } = context;

	return (
		<MuiSlider { ...{
			value: initialValue,
			onChange: ({ target: { value }}) =>
				onChange(buildEvent({ newValue: value })),
			...args,
		} }
		/>);
};

export default Slider;
