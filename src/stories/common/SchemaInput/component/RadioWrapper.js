import React, { useState } from 'react';
import RadioGroup from '../../RadioGroup';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const RadioWrapper = (args) => {
	const {
		schema: { disabled }, schema,
		value: initialValue, onChange = nothing,
	} = args;
	const [value, setValue] = useState(initialValue);

	return (
		<RadioGroup { ...{
			options: schema.enum,
			onChange: (evt) => {
				setValue(evt.target.value);
				onChange(buildEvent({ value: evt.target.value }));
			},
			value: value,
			disabled: disabled,
		} }
		/>);
};

export default RadioWrapper;
