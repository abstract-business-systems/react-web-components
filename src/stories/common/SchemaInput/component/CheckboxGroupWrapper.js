import React, { useState } from 'react';
import MuiSelect from './MultiSelectCheckbox';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';
import { pick } from '@laufire/utils/collection';

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

const updateValue = (value, { setUserInput, onChange = nothing }) => {
	setUserInput(value);
	onChange(buildEvent({ value }));
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { validate } = props;

		validate(value) && updateValue(value, props);
	};

const CheckBoxGroupWrapper = (args) => {
	const { schema: { items }, schema,	value: initialValue } = args;
	const [userInput, setUserInput] = useState(initialValue);
	const props = { ...args, setUserInput };

	return (
		<MuiSelect { ...{
			options: items.enum || pick(items.oneOf, 'const'),
			onChange: handleValidInput(props),
			value: userInput,
			schema: schema,
			...getInputProps(schema),
		} }
		/>);
};

export default CheckBoxGroupWrapper;
