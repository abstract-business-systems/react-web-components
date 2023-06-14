import * as React from 'react';
import Debugger from '../stories/common/Debugger';

const component = {
	title: 'Display/DeBugger',
	component: Debugger,
};

export default component;

const Template = (args) =>
	<Debugger { ...args }/>;

export const DeBugger = Template.bind({});

DeBugger.args = { value: 'ABC' };
