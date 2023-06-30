import React, { useEffect, useState } from 'react';
import '../../../styles/global.scss';
import clsx from 'clsx';
import { identity, nothing } from '@laufire/utils/fn';
import { everything } from '@laufire/utils/predicates';
import inputProps from '../helper/inputProps';
import transformValue from '../helper/transformValue';
import inputValidators from '../helper/inputValidators';
import buildEvent from '../../helper/buildEvent';
import Input from '../../Input';

const handleValidInput = (props, newValue) => {
	const {
		setUserInput, userInput, context: {
			validate,
			onChange = nothing,
		},
		transform,
	} = props;
	const isValid = validate(transform(newValue));

	setUserInput((prev) => ({
		...prev, value: newValue,
		...isValid && { valid: newValue },
	}));
	const error = validate.errors && { message: validate.errors[0].message };
	const value = isValid ? newValue : userInput.valid;

	onChange(buildEvent({ value, error }));
};

const getClassName = (props) => {
	const {
		userInput, transform,
		context: { validate },
	} = props;

	return !validate(transform(userInput.value)) && 'abs-error';
};

const textFieldProps = ({ readOnly, disabled }) => ({
	variant: 'standard',
	InputProps: {
		disableUnderline: true,
		readOnly: readOnly,
		disabled: disabled,
	},
	sx: { width: '200px' },
});

const handleChange = (props) =>
	({ target: { value: newValue }}) => {
		const { context: { component }} = props;
		const isValid = inputValidators[component] || everything;

		return isValid(newValue)
			&& handleValidInput(props, newValue);
	};

const TextFieldWrapper = (context) => {
	const { value, component, schemaType, schema, className } = context;
	const [userInput, setUserInput] = useState({ value: value, valid: value });
	const transform = transformValue[component] || identity;
	const props = { setUserInput, userInput, transform, context };
	const buildInputProps = inputProps[component] || nothing;
	const extendedProps = { inputProps: buildInputProps(context) };

	useEffect(() => {
		setUserInput({ value: value, valid: value });
	}, [value]);

	return (
		<Input { ...{
			...textFieldProps(schema),
			type: schemaType,
			className: clsx(getClassName(props), className),
			value: userInput.value,
			onChange: handleChange(props), ...extendedProps,
		} }
		/>);
};

export default TextFieldWrapper;
