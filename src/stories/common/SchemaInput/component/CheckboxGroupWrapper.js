import React, { useState } from 'react';
import dataFormatter from '../dataFormatter';
import MuiSelect from './MultiSelectCheckbox';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return {
		disableUnderline: true,
		variant: 'standard',
		multiple: true,
		sx: { width: '150px' },
		inputProps: { readOnly, disabled },
	};
};

const getValidValue = (value, { setUserInput, onChange = nothing }) => {
	setUserInput(value);
	onChange(buildEvent({ value }));
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { validate } = props;

		return validate(value)
		&& getValidValue(value, props);
	};

const CheckBoxGroupWrapper = (args) => {
	const { schema: { items }, schema,	value: initialValue } = args;
	const [userInput, setUserInput] = useState(initialValue);
	const multiSelectType = items.enum ? 'enum' : 'oneOf';
	const props = { ...{ ...args, setUserInput }};

	return (
		<MuiSelect { ...{
			options: dataFormatter[multiSelectType](items),
			onChange: handleValidInput(props),
			value: userInput,
			schema: schema,
			...getInputProps(schema),
		} }
		/>);
};

export default CheckBoxGroupWrapper;
