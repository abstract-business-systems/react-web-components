import React, { useState } from 'react';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import Slider from '../../Slider';

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const {
			setUserInput,
			onChange = nothing,
		} = props;

		setUserInput(value);
		onChange(buildEvent({ value }));
	};

const sliderProps = (schema) => ({
	size: 'large',
	color: 'success',
	valueLabelDisplay: 'auto',
	min: schema.minimum,
	max: schema.maximum,
	step: schema.multipleOf,
	sx: { width: '70%' },
	disabled: schema.disabled,
});

const SliderWrapper = (args) => {
	const { schema, value } = args;
	const [userInput, setUserInput] = useState(value);

	return (
		<Slider { ...{
			value: userInput,
			schema: schema,
			onChange: handleValidInput({ ...{ ...args, setUserInput }}),
			...sliderProps(schema),
		} }
		/>);
};

export default SliderWrapper;
