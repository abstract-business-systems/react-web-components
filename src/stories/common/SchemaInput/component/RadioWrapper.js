import React, { useState } from 'react';
import RadioGroup from '../../RadioGroup';
import { nothing } from '@laufire/utils/fn';

const RadioWrapper = (context) => {
	const {
		schema: { disabled }, schema,
		value: initialValue, onChange = nothing,
	} = context;
	const [value, setValue] = useState(initialValue);

	return (
		<RadioGroup { ...{
			options: schema.enum,
			onChange: (evt) => {
				setValue(evt.target.value);
				onChange(evt);
			},
			value: value,
			disabled: disabled,
		} }
		/>);
};

export default RadioWrapper;
