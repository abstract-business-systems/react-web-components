import { map } from '@laufire/utils/collection';
import {
	Checkbox, FormControl, FormHelperText, InputLabel,
	ListItemText,
	MenuItem, Select as MuiSelect,
} from '@mui/material';
import { React } from 'react';
import { nothing } from '@laufire/utils/fn';

const MenuList = ({	 options, value }) =>
	map(options, (option, index) => {
		const checkedState = value.includes(option);

		return <MenuItem key={ index } value={ option }>
			<Checkbox checked={ checkedState }/>
			<ListItemText>{ option }</ListItemText></MenuItem>;
	});

const DropDown = (context) => {
	const {
		options, onChange = nothing,
		multiple, value, ...rest
	} = context;

	return (
		<MuiSelect
			{ ...{
				value: value,
				multiple: multiple,
				onChange: (evt) => onChange(evt),
				renderValue: (selectedValue) => selectedValue.join(', '),
				...rest,
			} }
		>{ MenuList({ options, value }) }</MuiSelect>);
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
