import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return { inputProps: { readOnly, disabled }};
};

const getValidValue = (value, {
	setUserInput,
	onChange = nothing,
}) => {
	setUserInput(value);
	onChange(buildEvent({ value }));
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { validate } = props;

		return validate(value)
		&& getValidValue(value, props);
	};
const selectProps = {
	multiple: true,
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
};
const MultiSelectWrapper = (args) => {
	const { options, schema, value } = args;
	const [userInput, setUserInput] = useState(value);
	const props = { ...{ setUserInput, ...args }};

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
