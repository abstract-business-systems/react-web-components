import React, { useState } from 'react';
import MuiSelect from './MultiSelectCheckbox';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';
import getInputProps from '../helper/getInputProps';
import getOneOfOptions from '../helper/getOneOfOptions';

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
			options: items.enum || getOneOfOptions(items),
			onChange: handleValidInput(props),
			value: userInput,
			schema: schema,
			multiple: true,
			...getInputProps(schema),
		} }
		/>);
};

export default CheckBoxGroupWrapper;
