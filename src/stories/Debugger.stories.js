import React from 'react';
import Debugger from '../components/common/Debugger';

const component = {
	title: 'Display/DeBugger',
	component: Debugger,
};

export default component;

const Template = (args) =>
	<Debugger { ...args }/>;

export const DeBugger = Template.bind({});

DeBugger.args = { value: 'ABC' };
