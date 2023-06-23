import { InputAdornment as MuiAdornment, TextField } from '@mui/material';
import { React } from 'react';
import * as Icons from '@mui/icons-material';
import { reduce } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const InputAdornment = (cur, key) => {
	const { text, icon } = cur;
	const Icon = Icons[icon];

	return (
		<MuiAdornment position={ key }>
			{ Icon ? <Icon/> : text }
		</MuiAdornment>
	);
};

const inputProps = (adornments) => reduce(
	adornments, (
		acc, cur, key
	) => ({
		...acc,
		[`${ key }Adornment`]: InputAdornment(cur, key),
	}), {}
);

const Input = (context) => {
	const {
		adornments = {}, multiline = false, onChange = nothing,
		value: initialValue, ...args
	} = context;
	const MultilineProps = multiline && { ...multiline, multiline: true };

	return (
		<TextField
			{ ...{
				InputProps: inputProps(adornments),
				...MultilineProps, ...args,
				value: initialValue,
				onChange: ({ target: { value }}) =>
					onChange(buildEvent({ value })),
			} }
		/>);
};

export default Input;
