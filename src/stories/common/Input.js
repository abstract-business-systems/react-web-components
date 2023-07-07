import React from 'react';
import { TextField } from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const getValue = (evt, type) => {
	const { target: { value, files }} = evt;

	return type === 'file'
		? { value: { path: value, files: files }}
		: { value };
};

const Input = (args) => {
	const {
		multiline = false, onChange = nothing,
		type, ...rest
	} = args;
	const multilineProps = multiline && { ...multiline, multiline: true };

	return (
		<TextField
			{ ...{
				type: type,
				...multilineProps,
				onChange: (evt) =>
					onChange(buildEvent(getValue(evt, type))),
				...rest,
			} }
		/>);
};

export default Input;
