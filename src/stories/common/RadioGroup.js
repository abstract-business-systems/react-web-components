import { React } from 'react';
import Radio from '@mui/material/Radio';
import { RadioGroup as MuiRadioGroup } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { map } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const RadioGroup = (context) => {
	const {
		options, value: initialValue,
		onChange = nothing, disabled,
	} = context;

	return <FormControl disabled={ disabled }>
		<MuiRadioGroup
			value={ initialValue }
			onChange={ ({ target: { value }}) =>
				onChange(buildEvent({ newValue: value })) }
		>
			{ map(options, (option, index) =>
				<FormControlLabel
					key={ index }
					value={ option }
					control={ <Radio/> }
					label={ option }
				/>) }</MuiRadioGroup></FormControl>;
};

export default RadioGroup;
