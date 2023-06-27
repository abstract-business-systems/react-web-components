import React from 'react';
import { InputAdornment as MuiAdornment, TextField } from '@mui/material';
import { filter, map, pick } from '@laufire/utils/collection';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';
import getIcons from './helper/getIcons';
import { truthy } from '@laufire/utils/predicates';

const inputProps = (adornments, results) =>
	map(results, (result, key) =>
		<MuiAdornment position={ adornments[key].position }>
			{ result }
		</MuiAdornment>);

const Input = (context) => {
	const {
		adornments = {}, multiline = false, onChange = nothing,
		value: initialValue, ...args
	} = context;
	const multilineProps = multiline && { ...multiline, multiline: true };

	const icons = getIcons(pick(adornments, 'icon'));
	const texts = pick(filter(adornments, ({ text }) =>
		truthy(text)), 'text');

	return (
		<TextField
			{ ...{
				InputProps: inputProps(adornments, { ...icons, ...texts }),
				...multilineProps, ...args,
				value: initialValue,
				onChange: ({ target: { value }}) =>
					onChange(buildEvent({ value })),
			} }
		/>);
};

export default Input;
