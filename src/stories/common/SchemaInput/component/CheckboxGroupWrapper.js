import React, { useState } from 'react';
import CheckboxGroup from '../../CheckboxGroup';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const getOptions = ({ enum: values }, labels) => values.map((val, i) => ({
	value: val,
	label: labels[i],
}));

const genOnChange = ({ onChange = nothing, setValue, data }) => {
	setValue(data);
	onChange(buildEvent({ value: data }));
};

const CheckboxGroupWrapper = (args) => {
	const {
		schema: { disabled, items, labels },
		value: initialValue, validate,
	} = args;
	const [value, setValue] = useState(initialValue);

	return (
		<CheckboxGroup { ...{
			options: getOptions(items, labels),
			onChange: ({ data }) =>
				validate(data) && genOnChange({ ...args, data, setValue }),
			value: value,
			disabled: disabled,
		} }
		/>);
};

export default CheckboxGroupWrapper;
