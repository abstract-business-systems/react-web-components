import React, { useState } from 'react';
import CheckboxGroup from '../../CheckboxGroup';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../common/helper/buildEvent';
import getOptions from '../helper/getOptions';

const updateValue = ({ onChange = nothing, setValue, data }) => {
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
				validate(data) && updateValue({ ...args, data, setValue }),
			value: value,
			disabled: disabled,
		} }
		/>);
};

export default CheckboxGroupWrapper;
