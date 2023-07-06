import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return { inputProps: { readOnly, disabled }};
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { setUserInput, onChange = nothing } = props;

		setUserInput(value);
		onChange(buildEvent({ value }));
	};
const selectProps = {
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
};
const SingleSelectWrapper = (args) => {
	const { schema, value } = args;
	const options = schema.enum;
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: options,
			...selectProps,
			value: userInput,
			schema: schema,
			onChange: handleValidInput({ ...{ setUserInput, ...args }}),
			...getInputProps(schema),
		} }
		/>);
};

export default SingleSelectWrapper;
