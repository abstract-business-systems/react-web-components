import { React, useState } from 'react';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import Slider from '../../Slider';

const updateValue = (value, {
	setUserInput,
	context: { onChange = nothing },
}) => {
	setUserInput(value);
	onChange(buildEvent({ newValue: value }));
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { context: { validate }} = props;

		validate(value) && updateValue(value, props);
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

const SliderWrapper = (context) => {
	const { schema, value } = context;
	const [userInput, setUserInput] = useState(value);
	const props = { setUserInput, context };

	return (
		<Slider { ...{
			value: userInput,
			schema: schema,
			onChange: handleValidInput(props),
			...sliderProps(schema),
		} }
		/>);
};

export default SliderWrapper;
