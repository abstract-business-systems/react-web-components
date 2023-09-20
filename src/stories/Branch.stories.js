import React from 'react';
import Branch from '../components/Branch';

const GenComponent = ({ content }) => <div>{ content }</div>;

const component = {
	title: 'Branch',
	component: Branch,
};

export default component;

const Template = (args) => <Branch { ...args }/>;

export const BranchTemp = Template.bind({});

BranchTemp.args = {
	options: {
		component: () => <GenComponent { ...{ content: 'component' } }/>,
		componentTwo: () => <GenComponent { ...{ content: 'componentTwo' } }/>,
	},
	value: 'component',
};

export const BranchTempp = Template.bind({});

BranchTempp.args = {
	options: [
		{
			value: 'component',
			component: () => <GenComponent { ...{ content: 'component' } }/>,
		},

		{
			value: 'componentTwo',
			component: () => <GenComponent { ...{ content: 'componentTwo' } }/>,
		},
	],
	value: 'componentTwo',
};
