import React from 'react';
import { InputAdornment as MuiAdornment, TextField } from '@mui/material';
import { filter, map } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';
import IconButton from './IconButton';
import { isDefined } from '@laufire/utils/reflection';

const InputAdornment = (cur) => {
	const { text, icon, position } = cur;

	return (
		<MuiAdornment position={ position }>
			{ icon ? <IconButton icon={ icon }/> : text }
		</MuiAdornment>
	);
};

const getIcons = (icons) => {
	const Icons = filter(icons, isDefined);

	return map(Icons, InputAdornment);
};

const Input = (context) => {
	const {
		adornments = {}, multiline = false, onChange = nothing,
		value: initialValue, ...args
	} = context;
	const MultilineProps = multiline && { ...multiline, multiline: true };

	return (
		<TextField
			{ ...{
				InputProps: getIcons(adornments),
				...MultilineProps, ...args,
				value: initialValue,
				onChange: ({ target: { value }}) =>
					onChange(buildEvent({ value })),
			} }
		/>);
};

export default Input;
