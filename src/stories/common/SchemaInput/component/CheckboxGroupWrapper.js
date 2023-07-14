import React, { useState } from 'react';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';
import CheckboxGroup from '../../CheckboxGroup';

const CheckboxGroupWrapper = (args) => {
	const {
		schema: { disabled, items },
		value: initialValue, onChange = nothing,
	} = args;
	const [value, setValue] = useState(initialValue);

	return (
		<CheckboxGroup { ...{
			options: items.enum,
			onChange: ({ data }) => {
				setValue(data);
				onChange(buildEvent({ value: data }));
			},
			value: value,
			disabled: disabled,
		} }
		/>);
};

export default CheckboxGroupWrapper;
