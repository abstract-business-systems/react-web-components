import React from 'react';
import '../../../../stories/styles/global.scss';
import { nothing } from '@laufire/utils/fn';
import { everything } from '@laufire/utils/predicates';
import inputValidators from '../helper/inputValidators';
import Input from '../../Input';
import buildEvent from '../../helper/buildEvent';
import useFollowState from '../../hook/useFollowState';
import clsx from 'clsx';
import getDateProp from '../helper/getDateProp';
import getInputProp from '../helper/getInputProp';

const getClassName = (props) => {
	const { validate, userInput } = props;

	return !validate(userInput).isValid && 'abs-error';
};

const textFieldProps = ({ readOnly = false, disabled = false }) => ({
	variant: 'standard',
	InputProps: {
		disableUnderline: true,
		readOnly: readOnly,
		disabled: disabled,
	},
	sx: { width: '200px' },
});

const inputProps = {
	'date': getDateProp,
	'date-time': getDateProp,
	'number': getInputProp,
	'integer': getInputProp,
};

const getValue = ({ curValue, isValid, component }) => {
	// TODO: Fix the name of inputValidators.
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
	const getProps = inputProps[component] || nothing;

	return (
		<Input { ...{
			type: schemaType,
			className: clsx(getClassName({ ...props, userInput }), className),
			value: userInput,
			onChange: ({ data }) => setUserInput(data),
			inputProps: getProps(props),
			...textFieldProps(schema),
		} }
		/>);
};

export default TextFieldWrapper;
