import React from 'react';
import Radio from '@mui/material/Radio';
import { RadioGroup as MuiRadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { map } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const RadioButton = (options, { color, labelPlacement }) =>
	map(options, (option, index) =>
		<FormControlLabel { ...{
			key: index,
			value: option,
			control: <Radio { ...{ color } }/>,
			label: option,
			labelPlacement: labelPlacement,
		} }
		/>);

// Todo: Not able to call with angular brackets.
const RadioGroup = (args) => {
	const {
		options, value: initialValue, onChange = nothing,
		disabled = false, row, ...rest
	} = args;

	return <FormControl disabled={ disabled }>
		<MuiRadioGroup { ...{
			value: initialValue,
			onChange: ({ target: { value }}) => onChange(buildEvent({ value })),
			row: row,
		} }
		>
			{ RadioButton(options, rest) }
		</MuiRadioGroup>
	</FormControl>;
};

export default RadioGroup;
