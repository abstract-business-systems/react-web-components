import React from 'react';
import {
	Input,
	Select,
	Permissions,
	List,
	MultiSelect,
	Transformation,
	Button,
} from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import GlobalContext from '../../components/Document/GlobalContext';
import { result } from '@laufire/utils/collection';
import ListItem from '../../components/List/ListItem';
import { resolve } from '@laufire/utils/path';

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
		parentOne: { apiClient: { data: { todos: { data: [] }}}},
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
	name: 'todoCount',
	fn: ({ entity }) => entity.length,
};

const restClientProps = {
	name: 'apiClient',
	base: 'https://jsonplaceholder.typicode.com',
};

const Display = ({ value }) =>
	<GlobalContext.Consumer>
		{ (context) => {
			const title = result(context.state, resolve(context.path, value));

			return (
				<div>{ title }</div>);
		} }
	</GlobalContext.Consumer>;

const Todo = ({ data: { original }, ...rest }) =>
	<ListItem { ...{ data: original, ...rest } }>
		<Display value="./data/title/"/>
		<GlobalContext.Consumer>
			{ ({ path, state }) => {
				const data = result(state, path);

				return (
					<Button { ...{
						onClick: {
							action: 'delete', data: data,
							entity: 'todos', to: '/parentOne/apiClient/',
						},
						children: 'delete',
					} }
					/>);
			} }
		</GlobalContext.Consumer>
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

const WithState = () =>
	<Document { ...documentProps }>
		<Permissions { ...permissionsProps }/>
		<Select { ...selectProps }/>
		<Section label="ParentOne" name="parentOne">
			<Transformation { ...transformationProps }/>
			<RESTClient { ...restClientProps }/>
			<MultiSelect { ...multiSelectProps }/>
			<Input { ...inputProps }/>
			<List { ...listProps }/>
			<Button { ...{
				children: 'list', onClick: {
					to: '/parentOne/apiClient/',
					action: 'list', entity: 'todos',
				},
			} }
			/>
		</Section>
	</Document>;

export default WithState;
