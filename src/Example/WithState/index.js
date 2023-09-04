import React, { Fragment } from 'react';
import {
	Input,
	Select,
	Debugger,
	Permissions,
	List,
	MultiSelect,
	Transformation,
} from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import GlobalContext from '../../components/Document/GlobalContext';
import Button from '../../components/Button';
import { rndValue } from '@laufire/utils/random';
import { result } from '@laufire/utils/collection';

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
	action: 'patch',
	options: '/selectOptions/',
	name: 'singleSelect',
};

const multiSelectProps = {
	value: [],
	action: 'patch',
	options: '/selectOptions/',
	name: 'multiSelect',
};

const inputProps = {
	value: '',
	action: 'patch',
	name: 'input',
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
	fn: (data) => data.length,
};

const restClientProps = {
	name: 'apiClient',
	base: 'https://jsonplaceholder.typicode.com',
};

const listProps = (sendMessage) => ({
	value: [],
	Component: ({ data: { original }}) =>
		<Debugger { ...{
			value: original,
			onClick: ({ data }) => sendMessage({
				to: '/parentOne/apiClient/',
				action: 'delete', entity: 'todos', data: data,
			}),
		} }
		/>,
	name: 'apiClient/data/todos/data/',
});

const genUpdateOnClick = (state, sendMessage) => {
	const data = rndValue(result(state,
		'/parentOne/apiClient/data/todos/data/'));

	sendMessage({
		to: '/parentOne/apiClient/',
		action: 'patch', entity: 'todos',
		data: { ...data, data: { title: 'todos' }},
	});
};

const getOnClick = ({ sendMessage, state }) => ({
	listOnClick: () => {
		sendMessage({
			to: '/parentOne/apiClient/',
			action: 'list', entity: 'todos',
		});
	},

	createOnClick: () => {
		sendMessage({
			to: '/parentOne/apiClient/',
			action: 'create', entity: 'todos',
			data: { title: 'hi', userId: 1, completed: false },
		});
	},

	updateOnClick: () => {
		genUpdateOnClick(state, sendMessage);
	},

});

const ButtonContainer = () => <GlobalContext.Consumer>
	{ ({ sendMessage, state }) => {
		const { listOnClick, createOnClick, updateOnClick }
		= getOnClick({ sendMessage, state });

		return <Fragment>
			<Button { ...{ onClick: listOnClick, children: 'list' } }/>
			<Button { ...{ onClick: createOnClick, children: 'create' } }/>
			<Button { ...{ onClick: updateOnClick, children: 'update' } }/>
			<List { ...listProps(sendMessage) }/>
		</Fragment>;
	} }
</GlobalContext.Consumer>;

const WithState = () =>
	<Document { ...documentProps }>
		<Permissions { ...permissionsProps }/>
		<Select { ...selectProps }/>
		<Section label="ParentOne" name="parentOne">
			<Transformation { ...transformationProps }/>
			<MultiSelect { ...multiSelectProps }/>
			<Input { ...inputProps }/>
			<RESTClient { ...restClientProps }/>
			<ButtonContainer/>
		</Section>
	</Document>;

export default WithState;
