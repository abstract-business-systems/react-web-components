import React from 'react';
import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckbox } from '@mui/material';
import buildEvent from './common/helper/buildEvent';

const Checkbox = (args) => {
	const { value, onChange = nothing, ...rest } = args;

	return (
		<MuiCheckbox { ...{
			checked: value,
			onChange: ({ target: { checked }}) =>
				onChange(buildEvent({ value: checked })),
			...rest,
		} }
		/>);
};

export default Checkbox;
