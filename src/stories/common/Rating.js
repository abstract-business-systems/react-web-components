/* eslint-disable max-lines-per-function */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';
import Rating from '@mui/material/Rating';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';
import getIcons from './helper/getIcons';

const MuiRating = (args) => {
	const {
		value: initialValue,
		onChange = nothing, sx, icon, emptyIcon, ...rest
	} = args;

	return (
		<Rating { ...{
			value: initialValue,
			sx: sx,
			onChange: (dummy, value) =>
				onChange(buildEvent({ value })),
			// Todo: check sx parameter.
			...getIcons({ icon, emptyIcon }),
			...rest,
		} }
		/>);
};

export default MuiRating;
