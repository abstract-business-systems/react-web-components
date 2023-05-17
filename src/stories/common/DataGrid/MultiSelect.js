import { useState, React } from 'react';
import Select from '../Select';
import dataFormatter from './dataFormatter';
import updateRow from './updateRow';

const MuiSelect = (context) => {
	const { options, schema } = context;
	const [value, setValue] = useState([]);

	return (
		<Select { ...{
			options: options.enum,
			multiple: true,
			sx: { width: '150px' },
			disableUnderline: true,
			variant: 'standard',
			onChange: ({ target: { value: newValue }}) => {
				updateRow({ ...context, value: newValue });
				setValue(newValue);
			},
			value: value,
			schema: schema,
		} }
		/>);
};

const MultiSelect = (context) => {
	const { schema: { items, widget }} = context;

	const multiSelectType = items.enum ? 'enum' : 'oneOf';

	return (
		<MuiSelect { ...{
			...context,
			options: dataFormatter[multiSelectType](items),
			widget: widget,
		} }
		/>);
};

export default MultiSelect;
