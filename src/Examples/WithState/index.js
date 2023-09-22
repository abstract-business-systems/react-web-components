import React from 'react';
import {
	List,
	Button,
	Select,
	MultiSelect,
	Input,
	Transformation,
	Permissions,
	Location,
	Breadcrumbs,
	TreeView,
} from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import ListItem from '../../components/List/ListItem';
import {
	Display,
	Button as ButtonWithContext,
} from '../../components/WithContext';
import { length } from '@laufire/utils/collection';

const documentProps = {
	initialState: {
		a: { b: { c: '' }},
		b: { c: { d: 'ten', e: ['ten'] }},
		todo: [{ a: 1 }],
		structureTwoValue: {
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
		structureTwo: {
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
		selectOptions: [
			{
				value: 'ten',
				label: 'Ten',
			}, {
				value: 'twenty',
				label: 'Twenty',
			}, {
				value: 'thirty',
				label: 'Thirty',
			},
		],
		apiClient: { data: { todos: { data: {}}}},
	},
};

const selectProps = {
	value: 'ten',
	options: '/selectOptions/',
	name: './singleSelect',
};

const multiSelectProps = {
	value: [],
	options: '/selectOptions/',
	name: './multiSelect',
};

const inputProps = {
	value: '',
	name: './input',
};

const permissionsProps = {
	value: {
		notifications: 'granted',
		geolocation: 'granted',
	},
	name: 'permissions',
};

const transformationProps = {
	data: './apiClient/data/todos/data/',
	sam: './apiClient/data/todos/data/',
	name: 'todoCount',
	fn: ({ data }) => length(data),
};

const restClientProps = {
	name: 'apiClient',
	base: 'https://jsonplaceholder.typicode.com',
};

const Todo = (props) =>
	<ListItem { ...props }>
		<Display value="./data/title/"/>
		<ButtonWithContext { ...{
			onClick: {
				action: 'delete',
				entity: 'todos',
				to: '/apiClient/',
			},
		} }
		>delete</ButtonWithContext>
	</ListItem>;

const listProps = {
	value: './apiClient/data/todos/data/',
	Component: Todo,
	onLoad: [
		{
			to: '/apiClient/',
			action: 'list',
			entity: 'todos',
		},
	],
};

const createButtonProps = {
	onClick: {
		to: '/apiClient/',
		action: 'create',
		entity: 'todos',
		data: { title: ' hi' },
	},
};

const listButtonProps = {
	onClick: {
		to: '/apiClient/',
		action: 'list',
		entity: 'todos',
	},
};

const locationProps = {
	value: '',
	name: './geolocation',
};

const treeViewProps = {
	options: './structureTwo/',
	value: './structureTwoValue/valueTwo/',
	onClick: { to: 'location' },
};

const breadcrumbsProps = {
	value: './location/',
	onClick: { to: 'location' },
};

const WithState = () =>
	<Document { ...documentProps }>
		<Permissions { ...permissionsProps }/>
		<Location { ...locationProps }/>
		<Breadcrumbs { ...breadcrumbsProps }/>
		<TreeView { ...treeViewProps }/>
		<Select { ...selectProps }/>
		<Section label="ParentOne" name="parentOne">
			<RESTClient { ...restClientProps }/>
			<Transformation { ...transformationProps }/>
			<MultiSelect { ...multiSelectProps }/>
			<Input { ...inputProps }/>
			<List { ...listProps }/>
			<Button { ...listButtonProps }>List</Button>
			<Button { ...createButtonProps }>create</Button>
		</Section>
	</Document>;

export default WithState;
