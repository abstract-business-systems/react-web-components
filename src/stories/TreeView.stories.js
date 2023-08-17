import React from 'react';
import MuiTreeView from './common/TreeView';

const component = {
	title: 'Navigation/TreeView',
	component: MuiTreeView,
};

export default component;

const Template = (args) =>
	<MuiTreeView { ...args }/>;

export const TreeView = Template.bind({});

TreeView.args = {
	options: {
		'': {
			children: {
				parentOne: {
					children: {
						childOne: {
							children: {
								grandChildOne: {
									children: {},
									name: 'grandChildOne',
									label: 'GrandChildOne',
									path: '/parentOne/childOne/grandChildOne/',
								},
								grandChildTwo: {
									children: {},
									name: 'grandChildTwo',
									label: 'GrandChildTwo',
									path: '/parentOne/childOne/grandChildTwo/',
								},
							},
							name: 'childOne',
							label: 'ChildOne',
							path: '/parentOne/childOne/',
						},
					},
					name: 'parentOne',
					label: 'ParentOne',
					path: '/parentOne/',
				},
				parentTwo: {
					children: {
						childOne: {
							children: {
								grandChildOne: {
									children: {},
									name: 'grandChildOne',
									label: 'GrandChildOne',
									path: '/parentTwo/childOne/grandChildOne/',
								},
								grandChildTwo: {
									children: {},
									name: 'grandChildTwo',
									label: 'GrandChildTwo',
									path: '/parentTwo/childOne/grandChildTwo/',
								},
							},
							name: 'childOne',
							label: 'ChildOne',
							path: '/parentTwo/childOne/',
						},
					},
					name: 'parentTwo',
					label: 'ParentTwo',
					path: '/parentTwo/',
				},
			},
			name: '',
			label: 'Home',
			path: '/',
		},
	},
	value: [
		{
			name: '',
			href: '/',
		},
		{
			name: 'parentTwo',
			href: '/parentTwo/',
		},
	],
};
