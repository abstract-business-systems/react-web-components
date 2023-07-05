import React, { useEffect, useState } from 'react';
import MuiRating from './common/Rating';
import * as icons from '@mui/icons-material';
import { keys } from '@laufire/utils/lib';

const component = {
	title: 'Inputs/Rating',
	component: MuiRating,
	argTypes: {
		icon: {
			control: 'select',
			options: keys(icons),
		},
		emptyIcon: {
			control: 'select',
			options: keys(icons),
		},
	},
	args: {
		icon: 'Favorite',
		emptyIcon: 'FavoriteBorder',
	},
};

export default component;

const Template = (args) => {
	const { value: initialValue, ...rest } = args;
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	return (
		<MuiRating { ...{
			onChange: (evt) => setValue(evt.target.value),
			value: value,
			...rest,
		} }
		/>);
};

export const Rating = Template.bind({});

Rating.args = {
	precision: 0.5,
	size: 'small',
	sx: { color: 'red' },
	max: 3,
	value: 1,
};
