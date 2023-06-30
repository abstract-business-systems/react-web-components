import React, { useEffect, useState } from 'react';
import '../../../styles/global.scss';
import clsx from 'clsx';
import { identity, nothing } from '@laufire/utils/fn';
import { everything } from '@laufire/utils/predicates';
import inputProps from '../helper/inputProps';
import transformValue from '../helper/transformValue';
import inputValidators from '../helper/inputValidators';
import Input from '../../Input';
import buildEvent from '../../helper/buildEvent';

const getValidOnChange = (props, newValue) => {
	const {
		setUserInput, value: validValue,
		validate,
		onChange = nothing,
		transform,
	} = props;
	const isValid = validate(transform(newValue));

	setUserInput(newValue);
	const error = validate.errors && { message: validate.errors[0].message };
	const value = isValid ? newValue : validValue;

	onChange(buildEvent({ value, error }));
};

const getClassName = (props) => {
	const {
		userInput, transform,
		validate,
	} = props;

	return validate(transform(userInput)) ? '' : 'abs-error';
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

const getOnChange = (props) =>
	({ target: { value: newValue }}) => {
		const { component } = props;
		const isValid = inputValidators[component] || everything;

		return isValid(newValue)
			&& getValidOnChange(props, newValue);
	};

const TextFieldWrapper = (context) => {
	const { value, component, schemaType, schema, className } = context;
	const [userInput, setUserInput] = useState(value);
	const transform = transformValue[component] || identity;
	const props = { setUserInput, userInput, transform, ...context };
	const buildInputProps = inputProps[component] || nothing;

	useEffect(() => {
		setUserInput(value);
	}, [value]);

	return (
		<Input { ...{
			...textFieldProps(schema),
			type: schemaType,
			className: clsx(getClassName(props), className),
			value: userInput,
			onChange: getOnChange(props),
			inputProps: buildInputProps(context),
		} }
		/>);
};

export default TextFieldWrapper;
