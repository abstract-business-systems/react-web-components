import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import getInputProps from '../helper/getInputProps';

const generateOnChange = (props) =>
	({ target: { value }}) => {
		const { setUserInput, onChange = nothing } = props;

		setUserInput(value);
		onChange(buildEvent({ value }));
	};

const SingleSelectWrapper = (args) => {
	const { schema, value } = args;
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: schema.enum,
			value: userInput,
			schema: schema,
			onChange: generateOnChange({ setUserInput, ...args }),
			...getInputProps(schema),
		} }
		/>);
};

export default SingleSelectWrapper;
