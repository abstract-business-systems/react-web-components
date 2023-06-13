import { React, useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return { inputProps: { readOnly, disabled }};
};

const getValidValue = (newValue, {
	setUserInput,
	context: { onChange = nothing },
}) => {
	setUserInput(newValue);
	onChange(buildEvent({ newValue }));
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { context: { validate }} = props;

		return validate(value)
		&& getValidValue(value, props);
	};
const selectProps = {
	multiple: true,
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
};
const MultiSelectWrapper = (context) => {
	const { options, schema, value } = context;
	const [userInput, setUserInput] = useState(value);
	const props = { setUserInput, context };

	return (
		<Select { ...{
			options: options,
			...selectProps,
			value: userInput,
			schema: schema,
			onChange: handleValidInput(props),
			...getInputProps(schema),
		} }
		/>);
};

export default MultiSelectWrapper;
