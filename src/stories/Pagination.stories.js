import * as React from 'react';
import MuiPagination from '../stories/common/Pagination';

const component = {
	title: 'Navigation/Pagination',
	component: MuiPagination,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
	},
	args: { color: 'Primary' },
};

export default component;

const Template = (args) => <MuiPagination { ...args }/>;

export const Pagination = Template.bind({});

Pagination.args = {
	count: 5,
	color: 'secondary',
	disabled: false,
	variant: 'outlined',
	size: 'small',
	shape: 'rounded',
	showFirstButton: false,
	showLastButton: false,
	hidePrevButton: false,
	hideNextButton: false,
	defaultPage: 2,
};
