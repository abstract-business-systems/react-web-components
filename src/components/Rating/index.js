import React from 'react';
import Rating from '@mui/material/Rating';
import buildEvent from '../common/helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';
import getIcons from '../common/helper/getIcons';

const MuiRating = (args) => {
	const {
		value: initialValue,
		onChange = nothing, icon, emptyIcon, ...rest
	} = args;

	return (
		<Rating { ...{
			value: initialValue,
			onChange: (dummy, value) =>
				onChange(buildEvent({ value })),
			...getIcons({ icon, emptyIcon }),
			...rest,
		} }
		/>);
};

export default MuiRating;
