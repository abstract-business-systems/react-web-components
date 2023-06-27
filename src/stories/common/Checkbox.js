import React from 'react';
import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckbox } from '@mui/material';
import buildEvent from './helper/buildEvent';

const Checkbox = (context) => {
	const { value, onChange = nothing, ...args } = context;

	return (
		<MuiCheckbox { ...{
			checked: value,
			onChange: ({ target: { checked }}) =>
				onChange(buildEvent({ value: checked })),
			...args,
		} }
		/>);
};

export default Checkbox;
