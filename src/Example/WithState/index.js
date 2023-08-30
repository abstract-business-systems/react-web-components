import React, { Fragment } from 'react';
import { Input, Select, List, MultiSelect } from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import GlobalContext from '../../components/Document/GlobalContext';
import Button from '../../components/Button';
import Debugger from '../../components/Debugger';

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
	value: '/b/c/d/',
	action: 'patch',
	options: '/selectOptions/',
};

const multiSelectProps = {
	value: '/b/c/e/',
	action: 'patch',
	options: '/selectOptions/',
};

const inputProps = {
	value: '/a/b/c/',
	action: 'patch',
};

const restClientProps = {
	name: 'apiClient',
	base: 'https://jsonplaceholder.typicode.com',
};

const listProps = {
	value: '/parentOne/apiClient/data/todos/data/',
	Component: ({ data: { original }}) =>
		<Debugger { ...{ value: original } }/>,
};

const ButtonContainer = () => <GlobalContext.Consumer>
	{ ({ sendMessage }) => {
		const onClick = () => {
			sendMessage({
				to: '/parentOne/apiClient/',
				action: 'list', entity: 'todos',
			});
		};

		return <Fragment>
			<Button { ...{ onClick } }/>
			<List { ...listProps }/>
		</Fragment>;
	} }
</GlobalContext.Consumer>;

const WithState = () =>
	<Document { ...documentProps }>
		<Input { ...inputProps }/>
		<Select { ...selectProps }/>
		<MultiSelect { ...multiSelectProps }/>
		<Section label="ParentOne" name="parentOne">
			<RESTClient { ...restClientProps }/>
			<ButtonContainer/>
		</Section>
	</Document>;

export default WithState;
