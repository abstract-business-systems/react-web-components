import React from 'react';
import MuiBreadcrumbs from '../components/common/Breadcrumbs';

const data = {
	example1: [
		{ label: 'Home', value: '#' },
		{ label: 'Component', value: '#' },
		{ label: 'Service', value: '#' },
	],
	example2: [
		{ label: 'Home', value: '#' },
		{ label: 'Component', value: '#' },
		{ label: 'Service', value: '#' },
		{ label: 'src', value: '#' },
		{ label: 'stories', value: '#' },
	],
};

const component = {
	title: 'Navigation/Breadcrumbs',
	component: MuiBreadcrumbs,
	argTypes: { value: { type: 'select', options: ['example1', 'example2'] }},
	args: { value: 'example1' },
};

export default component;

const Template = (args) => {
	const { value } = args;
	const Data = data[value];

	return <MuiBreadcrumbs { ...{ ...args, value: Data } }/>;
};

export const Breadcrumbs = Template.bind({});

Breadcrumbs.args = { separator: '/' };
