import React from 'react';
import { Switch as MuiSwitch } from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const Switch = ({ value, onChange = nothing, ...rest }) =>
	<MuiSwitch { ...{
		checked: value,
		onChange: ({ target: { checked }}) => {
			onChange(buildEvent({ value: checked }));
		},
		...rest,
	} }
	/>;

export default Switch;
