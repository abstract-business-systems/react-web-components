import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const Switch = (args) => {
	const { value, onChange = nothing, ...rest } = args;

	return (
		<MuiSwitch { ...{
			checked: value,
			onChange: ({ target: { checked }}) => {
				onChange(buildEvent({ value: checked }));
			},
			...rest,
		} }
		/>);
};

export default Switch;
