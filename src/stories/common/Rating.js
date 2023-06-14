import { React } from 'react';
import Rating from '@mui/material/Rating';
import buildEvent from './helper/buildEvent';
import * as Icons from '@mui/icons-material';
import { nothing } from '@laufire/utils/predicates';

const getIcon = ({ emptyIcon, selectedIcon }) => {
	const Icon = Icons[selectedIcon];
	const EmptyIcon = Icons[emptyIcon];

	return {
		icon: Icon && <Icon/>,
		emptyIcon: EmptyIcon && <EmptyIcon/>,
	};
};

const MuiRating = (args) => {
	const {
		value, emptyIcon,
		selectedIcon, onChange = nothing, ...rest
	} = args;

	return (
		<Rating { ...{
			value: value,
			onChange: (dummy, newValue) => {
				onChange(buildEvent({ newValue }));
			},
			...rest,
			...getIcon({ emptyIcon, selectedIcon }),
		} }

		/>);
};

export default MuiRating;
