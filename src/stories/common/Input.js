import React from 'react';
import { InputAdornment as MuiAdornment, TextField } from '@mui/material';
import { filter, map, pick } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';
import getIcons from './helper/getIcons';
import { truthy } from '@laufire/utils/predicates';

const inputProps = (adornments) => {
	const icons = getIcons(pick(adornments, 'icon'));
	const texts = pick(filter(adornments, ({ text }) =>
		truthy(text)), 'text');
	const inputAdornments = { ...icons, ...texts };

	return map(inputAdornments, (result, key) =>
		<MuiAdornment position={ adornments[key].position }>
			{ result }
		</MuiAdornment>);
};

const getValue = (evt, type) => {
	const { target: { value, files }} = evt;

	return type === 'file'
		? { value: { path: value, files: files }}
		: { value };
};

const Input = (args) => {
	const {
		adornments = {}, multiline = false, onChange = nothing,
		type, ...rest
	} = args;
	const multilineProps = multiline && { ...multiline, multiline: true };

	return (
		<TextField
			{ ...{
				type: type,
				InputProps: inputProps(adornments),
				...multilineProps,
				onChange: (evt) =>
					onChange(buildEvent(getValue(evt, type))),
				...rest,
			} }
		/>);
};

export default Input;
