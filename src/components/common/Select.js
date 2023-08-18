import React from 'react';
import { map } from '@laufire/utils/collection';
import {
	FormControl, FormHelperText, InputLabel,
	ListItemText,
	MenuItem, Select as MuiSelect,
} from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const GenMenuItem = (options) =>
	map(options, ({ value, label }, index) =>
		<MenuItem key={ index } value={ value }>
			<ListItemText>{ label }</ListItemText></MenuItem>);

const DropDown = (args) => {
	const {
		options, onChange = nothing,
		value, multiple, ...rest
	} = args;

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
		>{ GenMenuItem(options) }</MuiSelect>);
};

const Select = (args) => {
	const { helperText, label, sx, variant, ...rest } = args;

	return <FormControl sx={ sx } variant={ variant }>
		<InputLabel>{ label }</InputLabel>
		<DropDown { ...rest }/>
		<FormHelperText>{ helperText }</FormHelperText>
	</FormControl>;
};

export default Select;
