import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import getOneOfOptions from '../helper/getOneOfOptions';
import getSelectProp from '../helper/getSelectProp';

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

const MultiSelectWrapper = (args) => {
	const { schema: { items }, schema, value } = args;
	const options = items.enum || getOneOfOptions(items);
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: options,
			value: userInput,
			schema: schema,
			multiple: true,
			onChange: generateOnChange({ setUserInput, ...args }),
			...getSelectProp(schema),
		} }
		/>);
};

export default MultiSelectWrapper;
