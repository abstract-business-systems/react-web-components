import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import { isEqual, not } from '@laufire/utils/predicates';
import { filter } from '@laufire/utils/collection';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const updateOnChange = (args) => {
	const {
		evt: { target: { checked, value }},
		value: currentValue, onChange = nothing,
	} = args;

	const updatedValue = checked
		? [...currentValue, value]
		: filter(currentValue, not(isEqual(value)));

	onChange(buildEvent({ value: updatedValue }));
};

const Checkbox = (args) => {
	const { value: currentValue, option: { value }} = args;

	return (
		<MuiCheckbox { ...{
			checked: currentValue.includes(value),
			value: value,
			onChange: (evt) => updateOnChange({ ...args, evt }),
		} }
		/>);
};

const MuiFormGroup = (args) => {
	const { options } = args;

	return <FormGroup>
		{ options.map((option, index) =>
			<FormControlLabel
				key={ index }
				{ ...{
					control: <Checkbox { ...{ option, ...args } }/>,
					label: option.label,
				} }
			/>) }
	</FormGroup>;
};

const CheckboxGroup = (args) => {
	const { disabled = false } = args;

	return <FormControl disabled={ disabled }>
		<MuiFormGroup { ...args }/>
	</FormControl>;
};

export default CheckboxGroup;
