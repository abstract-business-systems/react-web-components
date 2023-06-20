import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckbox } from '@mui/material';
import { React } from 'react';
import buildEvent from './helper/buildEvent';

const Checkbox = (context) => {
	const { value, onChange = nothing, ...args } = context;

	return (
		<MuiCheckbox { ...{
			checked: value,
			onChange: ({ target: { checked }}) =>
				onChange(buildEvent({ newValue: checked })),
			...args,
		} }

		/>);
};

export default Checkbox;
