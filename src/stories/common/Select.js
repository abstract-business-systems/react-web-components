import { map } from '@laufire/utils/collection';
import {
	FormControl, FormHelperText, InputLabel,
	ListItemText,
	MenuItem, Select as MuiSelect,
} from '@mui/material';
import { React } from 'react';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../common/helper/buildEvent';

const MenuList = (options) =>
	map(options, (option, index) =>
		<MenuItem key={ index } value={ option }>
			<ListItemText>{ option }</ListItemText></MenuItem>);

const DropDown = (context) => {
	const {
		options, onChange = nothing,
		value, ...rest
	} = context;

	return (
		<MuiSelect
			{ ...{
				value: value,
				onChange: (evt) =>
					onChange(buildEvent({ newValue: evt.target.value })),
				renderValue: (selected) => selected.join(', '),
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
