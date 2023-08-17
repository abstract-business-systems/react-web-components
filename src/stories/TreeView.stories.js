import React from 'react';
import MuiTreeView from './common/TreeView';

const structure = {
	structureOne: {
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

	structureTwo: {
		'': {
			children: {
				applications: {
					children: {
						calender: {
							children: {},
							name: 'calender',
							label: 'Calender',
							path: '/applications/calender/',
						},
					},
					name: 'applications',
					label: 'Applications',
					path: '/applications/',
				},
				documents: {
					children: {
						oss: {
							children: { },
							name: 'oss',
							label: 'OSS',
							path: '/documents/oss/',
						},
						mui: {
							children: {
								index: {
									children: { },
									name: 'index',
									label: 'Index',
									path: '/documents/oss/mui/index',
								},
							},
							name: 'mui',
							label: 'MUI',
							path: '/documents/oss/mui',
						},
					},
					name: 'documents',
					label: 'Documents',
					path: '/documents/',
				},
			},
			name: '',
			label: 'Home',
			path: '/',
		},
	},
};

const structuralValue = {
	structureOne: {
		valueOne: [
			{
				name: 'parentTwo',
				href: '/parentTwo/',
			},
		],
		valueTwo: [
			{
				name: 'parentOne',
				href: '/parentOne/childOne/',
			},
		],
	},
	structureTwo: {
		valueOne: [
			{
				name: 'calender',
				href: '/applications/calender/',
			},
		],
		valueTwo: [
			{
				name: 'oss',
				href: '/documents/oss/',
			},
		],
	},
};

const component = {
	title: 'Navigation/TreeView',
	component: MuiTreeView,
	argTypes: {
		value: {
			type: 'select',
			options: ['valueOne', 'valueTwo'],
		},
		options: {
			type: 'select',
			options: ['structureOne', 'structureTwo'],
		},
	},
	args: { value: 'valueOne', options: 'structureTwo' },

};

export default component;

const Template = (args) => {
	const { value, options } = args;

	return (
		<MuiTreeView { ...{
			...args,
			options: structure[options], value: structuralValue[options][value],
		} }
		/>);
};

export const TreeView = Template.bind({});

TreeView.args = {};
