import React, { useState } from 'react';
import buildEvent from '../../common/helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import Slider from '../../Slider';
import getInputProp from '../helper/getInputProp';

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
	sx: { width: '70%' },
	disabled: schema.disabled,
	...getInputProp(schema),
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
