import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';
import { isEqual, not } from '@laufire/utils/predicates';
import { filter } from '@laufire/utils/collection';

const handleChange = (args) => {
	const {
		evt: { target: { checked, value }},
		userInput, setUserInput,
	} = args;

	return checked
		? setUserInput([...userInput, value])
		: setUserInput(filter(userInput, not(isEqual(value))));
};

const Checkbox = (args) => {
	const { userInput, option: { value }} = args;

	return (
		<MuiCheckbox { ...{
			checked: userInput.includes(value),
			value: value,
			onChange: (evt) => handleChange({ ...args, evt }),
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
	const { value, disabled = false } = args;
	const [userInput, setUserInput] = useState(value);

	return <FormControl disabled={ disabled }>
		<MuiFormGroup { ...{ ...args, userInput, setUserInput } }/>
	</FormControl>;
};

export default CheckboxGroup;
