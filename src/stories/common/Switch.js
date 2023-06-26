import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const Switch = (context) => {
	const { value, onChange = nothing, ...args } = context;

	return (
		<MuiSwitch { ...{
			checked: value,
			onChange: ({ target: { checked }}) => {
				onChange(buildEvent({ value: checked }));
			},
			...args,
		} }
		/>);
};

export default Switch;
