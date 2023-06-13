import * as React from 'react';
import MuiPagination from '../stories/common/Pagination';

const component = {
	title: 'Navigation/Pagination',
	component: MuiPagination,
};

export default component;

const Template = (args) => <MuiPagination { ...args }/>;

export const Pagination = Template.bind({});

Pagination.args = {
	count: 5,
	// Todo: Color control not working properly, which ever require select change that.
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
