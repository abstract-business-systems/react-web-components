import React from 'react';
import { map } from '@laufire/utils/collection';
import {
	Checkbox, FormControl, FormHelperText, InputLabel,
	ListItemText, MenuItem, Select as MuiSelect,
} from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const MenuList = ({	options, value }) =>
	map(options, (option, index) => {
		const checkedState = value.includes(option);

		return <MenuItem key={ index } value={ option }>
			<Checkbox checked={ checkedState }/>
			<ListItemText>{ option }</ListItemText>
		</MenuItem>;
	});

const DropDown = (args) => {
	const { onChange = nothing,	...rest } = args;

	return (
		<MuiSelect
			{ ...{
				onChange: (evt) =>
					onChange(buildEvent({ value: evt.target.value })),
				renderValue: (selectedValue) => selectedValue.join(', '),
				...rest,
			} }
		>{ MenuList({ ...rest }) }</MuiSelect>);
};

const Select = (context) => {
	const { helperText, label, sx, variant, ...rest } = context;

	return <FormControl { ...{ sx, variant } }>
		<InputLabel>{ label }</InputLabel>
		<DropDown { ...rest }/>
		<FormHelperText>{ helperText }</FormHelperText>
	</FormControl>;
};

export default Select;
