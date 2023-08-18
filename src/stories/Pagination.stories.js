import React from 'react';
import MuiPagination from '../components/common/Pagination';

const component = {
	title: 'Navigation/Pagination',
	component: MuiPagination,
	argTypes: {
		color: {
			control: 'select',
			options: ['success', 'secondary', 'primary', 'error', 'warning'],
		},
		variant: {
			control: 'radio',
			options: ['standard', 'text', 'string', 'outlined'],
		},
		shape: {
			control: 'radio',
			options: ['rounded', 'circular'],
		},
	},
	args: { color: 'Primary', variant: 'standard' },
};

export default component;

const Template = (args) => <MuiPagination { ...args }/>;

export const Pagination = Template.bind({});

Pagination.args = {
	count: 5,
	color: 'secondary',
	disabled: false,
	size: 'small',
	showFirstButton: false,
	showLastButton: false,
	hidePrevButton: false,
	hideNextButton: false,
	value: 2,
};
