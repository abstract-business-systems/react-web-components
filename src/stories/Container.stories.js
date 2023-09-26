import React from 'react';
import DisplayContainer from '../components/Container';
import { Box } from '@mui/material';
import { peek } from '@laufire/utils/debug';

const component = {
	title: 'Display/Container',
	component: DisplayContainer,
};

export default component;

const Template = (args) => <DisplayContainer { ...args }/>;

export const Container = Template.bind({});

Container.args = {
	children: <Box sx={ { background: '#766b6b', height: '50vh' } }/>,
	style: {},
	shortcuts: { escape: () => peek('escape'), d: () => peek('d') },
	onChange: peek,
	resize: { refreshRate: 250 },
	onLoad: peek,
};
