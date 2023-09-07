import React from 'react';
import {
	List,
	Button,
	Select,
	MultiSelect,
	Input,
	Transformation,
	Permissions,
} from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import ListItem from '../../components/List/ListItem';
import {
	Display,
	Button as ButtonWithContext,
} from '../../components/WithContext';

const documentProps = {
	initialState: {
		a: { b: { c: '' }},
		b: { c: { d: 'ten', e: ['ten'] }},
		todo: [{ a: 1 }],
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
		parentOne: { apiClient: { data: { todos: { data: {}}}}},
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
	data: 'apiClient/data/todos/data/',
	sam: 'apiClient/data/todos/data/',
	name: 'todoCount',
	fn: ({ data }) => data.length,
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
				to: '/parentOne/apiClient/',
			},
		} }
		>delete</ButtonWithContext>
	</ListItem>;

const listProps = {
	value: './apiClient/data/todos/data/',
	Component: Todo,
	onLoad: {
		to: '/parentOne/apiClient/',
		action: 'list',
		entity: 'todos',
	},
};

const createButtonProps = {
	onClick: {
		to: '/parentOne/apiClient/',
		action: 'create',
		entity: 'todos',
		data: { title: ' hi' },
	},
};

const listButtonProps = {
	onClick: {
		to: '/parentOne/apiClient/',
		action: 'list',
		entity: 'todos',
	},
};

const WithState = () =>
	<Document { ...documentProps }>
		<Permissions { ...permissionsProps }/>
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
