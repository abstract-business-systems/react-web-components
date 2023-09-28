import React, { Fragment } from 'react';
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
	Ticker,
} from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import { length } from '@laufire/utils/collection';
import Todo from './Todo';

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
const TickerProps = {
	delay: 1000,
	count: 5,
	name: 'tick',
};
const TickerPropsTwo = {
	delay: 2000,
	count: 5,
	name: 'tickTwo',
};

const inputDataProps = { value: './data/input/' };

const buttonProps = { disabled: '/transform/update/' };

const transformUpdateProps = {
	name: 'transform',
	value: { update: true },
	data: './data/input/',
	fn: ({ data, value }) => {
		const update = value?.input ? value.input === data : true;
		const preInput = data;

		return { update: update, input: preInput };
	},
};

const SectionChild = () =>
	<Fragment>
		<RESTClient { ...restClientProps }/>
		<Transformation { ...transformationProps }/>
		<Ticker { ...TickerProps }/>
		<MultiSelect { ...multiSelectProps }/>
		<Ticker { ...TickerPropsTwo }/>
		<Input { ...inputProps }/>
		<List { ...listProps }/>
		<Button { ...listButtonProps }>List</Button>
		<Button { ...createButtonProps }>create</Button>
	</Fragment>;

const WithState = () =>
	<Document { ...documentProps }>
		<Permissions { ...permissionsProps }/>
		<Location { ...locationProps }/>
		<Breadcrumbs { ...breadcrumbsProps }/>
		<TreeView { ...treeViewProps }/>
		<Select { ...selectProps }/>
		<Input { ...inputDataProps }/>
		<Transformation { ...transformUpdateProps }/>
		<Button { ...buttonProps }>button</Button>
		<Section label="ParentOne" name="parentOne">
			<SectionChild/>
		</Section>
	</Document>;

export default WithState;
