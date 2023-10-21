import React from 'react';
import ListComponent from '../components/List';
import { Box } from '@mui/material';

const component = {
	title: 'Inputs/List',
	component: ListComponent,
};

export default component;

const Template = (args) => <ListComponent { ...args }/>;

export const List = Template.bind({});

const data = [
	{ data: 'a', id: 1 },
	{ data: 'b', id: 2 },
	{ data: 'c', id: 3 },
];

List.args = {
	value: { data },
	Component: ({ data: text }) => <Box>{ text }</Box>,
};
