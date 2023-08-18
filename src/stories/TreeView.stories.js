import React from 'react';
import MuiTreeView from '../components/common/TreeView';

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
									value: '/parentOne/childOne/grandChildOne/',
								},
								grandChildTwo: {
									children: {},
									name: 'grandChildTwo',
									label: 'GrandChildTwo',
									value: '/parentOne/childOne/grandChildTwo/',
								},
							},
							name: 'childOne',
							label: 'ChildOne',
							value: '/parentOne/childOne/',
						},
					},
					name: 'parentOne',
					label: 'ParentOne',
					value: '/parentOne/',
				},
				parentTwo: {
					children: {
						childOne: {
							children: {
								grandChildOne: {
									children: {},
									name: 'grandChildOne',
									label: 'GrandChildOne',
									value: '/parentTwo/childOne/grandChildOne/',
								},
								grandChildTwo: {
									children: {},
									name: 'grandChildTwo',
									label: 'GrandChildTwo',
									value: '/parentTwo/childOne/grandChildTwo/',
								},
							},
							name: 'childOne',
							label: 'ChildOne',
							value: '/parentTwo/childOne/',
						},
					},
					name: 'parentTwo',
					label: 'ParentTwo',
					value: '/parentTwo/',
				},
			},
			name: '',
			label: 'Home',
			value: '/',
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
							value: '/applications/calender/',
						},
					},
					name: 'applications',
					label: 'Applications',
					value: '/applications/',
				},
				documents: {
					children: {
						oss: {
							children: { },
							name: 'oss',
							label: 'OSS',
							value: '/documents/oss/',
						},
						mui: {
							children: {
								index: {
									children: { },
									name: 'index',
									label: 'Index',
									value: '/documents/mui/index',
								},
							},
							name: 'mui',
							label: 'MUI',
							value: '/documents/mui',
						},
					},
					name: 'documents',
					label: 'Documents',
					value: '/documents/',
				},
			},
			name: '',
			label: 'Home',
			value: '/',
		},
	},
};

const structuralValue = {
	structureOne: {
		valueOne: [
			{
				label: 'parentTwo',
				value: '/parentTwo/',
			},
		],
		valueTwo: [
			{
				label: 'parentOne',
				value: '/parentOne/childOne/',
			},
		],
	},
	structureTwo: {
		valueOne: [
			{
				label: 'calender',
				value: '/applications/calender/',
			},
		],
		valueTwo: [
			{
				label: 'oss',
				value: '/documents/oss/',
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

TreeView.args = { };
