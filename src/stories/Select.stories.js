import React, { useState } from 'react';
import MuiSelect from '../stories/common/Select';

const component = {
	title: 'Inputs/Select',
	component: MuiSelect,
};

export default component;

export const Select = (args) => {
	const [value, setValue] = useState([]);

	return (
		<MuiSelect { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...args,
		} }
		/>);
};

// Todo: When we toggle multiselect to true, it works; when we toggle multiselect to false, it doesn't.
Select.args = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	variant: 'standard',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	multiple: true,
	sx: { width: 300 },
	disableUnderline: false,
};
