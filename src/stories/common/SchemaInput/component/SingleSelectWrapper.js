import { React, useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return { inputProps: { readOnly, disabled }};
};

const handleValidInput = (props) =>
	({ target: { value }}) => {
		const { setUserInput, context: { onChange = nothing }} = props;

		setUserInput(value);
		onChange(buildEvent({ newValue: value }));
	};
const selectProps = {
	sx: { width: '150px' },
	disableUnderline: true,
	variant: 'standard',
};
const SingleSelectWrapper = (context) => {
	const { options, schema, value } = context;
	const [userInput, setUserInput] = useState(value);
	const props = { setUserInput, context };

	return (
		<Select { ...{
			options: options,
			...selectProps,
			value: userInput,
			schema: schema,
			onChange: handleValidInput(props),
			...getInputProps(schema),
		} }
		/>);
};

export default SingleSelectWrapper;
