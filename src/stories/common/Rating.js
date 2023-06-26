import React from 'react';
import Rating from '@mui/material/Rating';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';
import getIcons from './getIcons';

const MuiRating = (args) => {
	const {
		value: initialValue, emptyIcon,
		selectedIcon, onChange = nothing, sx, ...rest
	} = args;

	return (
		<Rating { ...{
			value: initialValue,
			onChange: (dummy, value) => {
				onChange(buildEvent({ value }));
			},
			...getIcons({ emptyIcon: emptyIcon, icon: selectedIcon }, sx),
			...rest,
		} }

		/>);
};

export default MuiRating;
