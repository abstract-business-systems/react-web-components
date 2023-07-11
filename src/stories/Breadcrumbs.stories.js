import React from 'react';
import MuiBreadcrumbs from './common/Breadcrumbs';

const component = {
	title: 'Navigation/Breadcrumbs',
	component: MuiBreadcrumbs,
};

export default component;

const Template = (args) => <MuiBreadcrumbs { ...args }/>;

export const Breadcrumbs = Template.bind({});

Breadcrumbs.args = {
	separator: '/',
	value: [
		{
			children: 'Home',
			href: '/',
		},
		{
			children: 'Component',
			href: '/component',
		},
	],
};
