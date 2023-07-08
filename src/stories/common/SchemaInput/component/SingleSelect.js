import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const getInputProps = (schema) => {
	const { readOnly = false, disabled = false } = schema;

	return { inputProps: { readOnly, disabled }};
};

const generateOnChange = (props) =>
	({ target: { value }}) => {
		const { setUserInput, onChange = nothing } = props;

		setUserInput(value);
		onChange(buildEvent({ value }));
	};

const props = {
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
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
			...props,
		} }
		/>);
};

export default SingleSelectWrapper;
