import { React, useState } from 'react';
import Rating from '@mui/material/Rating';
import buildEvent from './helper/buildEvent';
import * as Icons from '@mui/icons-material';

const getIcon = ({ emptyIcon, selectedIcon }) => {
	const Icon = Icons[selectedIcon];
	const EmptyIcon = Icons[emptyIcon];

	return {
		icon: Icon && <Icon/>,
		emptyIcon: EmptyIcon && <EmptyIcon/>,
	};
};

// Todo: Fix the console error
const MuiRating = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	// Todo: Fix the onChange.
	return (
		<Rating { ...{
			value: value,
			onChange: (dummy, newValue) => {
				setValue(newValue);
				buildEvent({ newValue });
			},
			...rest,
			...getIcon(rest),
		} }

		/>);
};

export default MuiRating;
