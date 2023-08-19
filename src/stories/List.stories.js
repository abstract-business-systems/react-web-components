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

List.args = {
	value: ['1', '2', '3', '4'],
	Component: ({ data }) => <Box>{ data.original }</Box>,
};
