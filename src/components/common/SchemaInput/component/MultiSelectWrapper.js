import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import getSelectProp from '../helper/getSelectProp';
import getOptions from '../helper/getOptions';

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
	const { schema: { items, labels }, schema, value } = args;
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: getOptions(items, labels),
			value: userInput,
			schema: schema,
			multiple: true,
			onChange: generateOnChange({ setUserInput, ...args }),
			...getSelectProp(schema),
		} }
		/>);
};

export default MultiSelectWrapper;
