import React from 'react';
import { map } from '@laufire/utils/collection';
import {
	FormControl, FormHelperText, InputLabel,
	ListItemText,
	MenuItem, Select as MuiSelect,
} from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../common/helper/buildEvent';

const MenuList = (options) =>
	map(options, (option, index) =>
		<MenuItem key={ index } value={ option }>
			<ListItemText>{ option }</ListItemText></MenuItem>);

const DropDown = (context) => {
	const {
		options, onChange = nothing,
		value, multiple, ...rest
	} = context;

	return (
		<MuiSelect
			{ ...{
				value: value,
				multiple: multiple,
				onChange: (evt) =>
					onChange(buildEvent({ value: evt.target.value })),
				...multiple
				&& { renderValue: (selected) => selected.join(', ') },
				...rest,
			} }
		>{ MenuList(options) }</MuiSelect>);
};

const Select = (context) => {
	const { helperText, label, sx, variant, ...rest } = context;

	return <FormControl sx={ sx } variant={ variant }>
		<InputLabel>{ label }</InputLabel>
		<DropDown { ...rest }/>
		<FormHelperText>{ helperText }</FormHelperText>
	</FormControl>;
};

export default Select;
