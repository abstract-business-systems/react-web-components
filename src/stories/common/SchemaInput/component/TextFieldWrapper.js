import React from 'react';
import '../../../styles/global.scss';
import { nothing } from '@laufire/utils/fn';
import { everything } from '@laufire/utils/predicates';
import inputProps from '../helper/inputProps';
import inputValidators from '../helper/inputValidators';
import Input from '../../Input';
import buildEvent from '../../helper/buildEvent';
import useFollowState from '../../hook/useFollowState';
import clsx from 'clsx';

const getClassName = (props) => {
	const { validate, userInput } = props;

	return !validate(userInput).isValid && 'abs-error';
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

const getValue = ({ curValue, isValid, component }) => {
	const isInputValid = inputValidators[component] || everything;

	return (isInputValid(curValue) && isValid)
	&& { value: curValue };
};

const getHandleChange = (props) => ({ curValue, preValue }) => {
	const { validate, onChange } = props;
	const { isValid, errors } = validate(curValue);
	const error = errors && { message: errors[0].message };
	const { value = preValue } = getValue({ ...props, curValue, isValid });

	onChange(buildEvent({ value, error }));
};

const TextFieldWrapper = (props) => {
	const { value, component, schemaType, schema, className } = props;

	const handleChange = getHandleChange(props);
	const [userInput, setUserInput] = useFollowState(value, handleChange);
	const buildInputProps = inputProps[component] || nothing;

	return (
		<Input { ...{
			...textFieldProps(schema),
			type: schemaType,
			className: clsx(getClassName({ ...props, userInput }), className),
			value: userInput,
			onChange: ({ data }) => setUserInput(data),
			inputProps: buildInputProps(props),
		} }
		/>);
};

export default TextFieldWrapper;
