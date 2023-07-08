import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import { pick } from '@laufire/utils/collection';

const getInputProps = (schema) => {
	const { readOnly = false, disabled = false } = schema;

	return { inputProps: { readOnly, disabled }};
};

const updateValue = (value, {
	setUserInput,
	onChange = nothing,
}) => {
	setUserInput(value);
	onChange(buildEvent({ value }));
};

const generateOnChange = (props) =>
	({ target: { value }}) => {
		const { validate } = props;

		validate(value) && updateValue(value, props);
	};

const props = {
	multiple: true,
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
};

const MultiSelectWrapper = (args) => {
	const { schema: { items }, schema, value } = args;
	const options = items.enum || pick(items.oneOf, 'const');
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: options,
			value: userInput,
			schema: schema,
			onChange: generateOnChange({ setUserInput, ...args }),
			...getInputProps(schema),
			...props,
		} }
		/>);
};

export default MultiSelectWrapper;
