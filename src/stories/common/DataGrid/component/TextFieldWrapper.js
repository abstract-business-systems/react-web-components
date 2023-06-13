import { React, useEffect, useState } from 'react';
import { identity, nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';
import TextField from '../../Input';
import inputProps from '../helper/inputProps';
import transformValue from '../helper/transformValue';
import checkInput from '../helper/checkInput';
import { everything } from '@laufire/utils/predicates';

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
	onChange(buildEvent({ isValid, userInput, newValue }));
};

const getClassName = (props) => {
	const {
		userInput, transform,
		context: { validate },
	} = props;

	return validate(transform(userInput.value))
		? ''
		: 'error';
};

const TextFieldProps = ({ readOnly, disabled }) => ({
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
		const getValidInput = checkInput[component] || everything;

		return getValidInput(newValue)
			&& handleValidInput(props, newValue);
	};

const TextFieldWrapper = (context) => {
	const { value, component, schemaType, schema } = context;
	const [userInput, setUserInput] = useState({ value: value, valid: value });
	const transform = transformValue[component] || identity;
	const props = { setUserInput, userInput, transform, context };
	const buildInputProps = inputProps[component] || nothing;
	const extendedProps = { inputProps: buildInputProps(context) };

	useEffect(() => {
		setUserInput({ value: value, valid: value });
	}, [value]);

	return (
		<TextField { ...{
			...TextFieldProps(schema),
			type: schemaType,
			className: getClassName(props),
			value: userInput.value,
			onChange: handleChange(props), ...extendedProps,
		} }
		/>);
};

export default TextFieldWrapper;
