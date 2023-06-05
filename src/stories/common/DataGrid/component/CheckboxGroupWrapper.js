/* eslint-disable max-lines-per-function */
import { React, useState } from 'react';
import dataFormatter from '../dataFormatter';
import MuiSelect from './MultiSelectCheckbox';
import handleChange from '../../helper/buildEvent';

const getInputProps = (schema) => {
	const { readOnly, disabled } = schema;

	return {
		disableUnderline: true,
		variant: 'standard',
		multiple: true,
		sx: { width: '150px' },
		inputProps: { readOnly, disabled },
	};
};

const CheckBoxGroupWrapper = (context) => {
	const {
		schema: { items, widget },
		schema,	value: initialValue = [], validate,
	} = context;
	const [value, setValue] = useState(initialValue);
	const multiSelectType = items.enum ? 'enum' : 'oneOf';
	const props = { context, setValue };

	return (
		<MuiSelect { ...{
			options: dataFormatter[multiSelectType](items),
			widget: widget,
			onChange: ({ target: { value: newValue }}) =>
				handleChange(newValue, props),
			value: value,
			schema: schema,
			...getInputProps(schema),
			validate: validate,
		} }
		/>);
};

export default CheckBoxGroupWrapper;
