import { React, useEffect, useState } from 'react';
import MuiRating from './common/Rating';

const component = {
	title: 'Inputs/Rating',
	component: MuiRating,
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
	emptyIcon: 'FavoriteBorder',
	selectedIcon: 'Favorite',
	sx: { color: 'green' },
	max: 3,
	value: 1,
};
