import { React, useState } from 'react';
import MuiRating from './common/Rating';

const component = {
	title: 'Inputs/Rating',
	component: MuiRating,
};

export default component;

const Template = (args) => {
	const [value, setValue] = useState(1);

	return (
		<MuiRating { ...{
			onChange: (evt) => setValue(evt.target.checked),
			checked: value,
			...args,
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
};
