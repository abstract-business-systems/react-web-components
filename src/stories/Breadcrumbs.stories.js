import React from 'react';
import MuiBreadcrumbs from './common/Breadcrumbs';

const component = {
	title: 'Navigation/Breadcrumbs',
	component: MuiBreadcrumbs,
};

export default component;

const Template = (args) => <MuiBreadcrumbs { ...args }/>;

export const Simple = Template.bind({});

Simple.args = {
	separator: '/',
	value: [
		{ label: 'Home' },
		{ label: 'Component' },
		{ label: 'Service' },
	],
};
