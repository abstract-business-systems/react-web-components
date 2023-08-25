import React from 'react';
import { Input, Select } from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import GlobalContext from '../../components/Document/GlobalContext';
import Button from '../../components/Button';

const documentProps = {
	initialState: {
		a: { b: { c: '' }},
		b: { c: { d: ['ten'] }},
		todo: [{ a: 1 }],
		multiple: false,
	},
};

const selectProps = {
	value: '/b/c/d/',
	multiple: '/multiple/',
	action: 'patch',
	options: [
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
};

const inputProps = {
	value: '/a/b/c/',
	action: 'patch',
};

const restClientProps = {
	name: 'apiClient',
	base: 'https://jsonplaceholder.typicode.com',
};

const ButtonContainer = () => <GlobalContext.Consumer>
	{ ({ sendMessage }) => {
		const onClick = () => {
			sendMessage({
				to: '/parentOne/apiClient/',
				action: 'list', entity: 'todos',
			});
		};

		return <Button { ...{ onClick } }/>;
	} }
</GlobalContext.Consumer>;

const WithState = () =>
	<Document { ...documentProps }>
		<Input { ...inputProps }/>
		<Select { ...selectProps }/>
		<Section label="ParentOne" name="parentOne">
			<RESTClient { ...restClientProps }/>
			<ButtonContainer/>
		</Section>
	</Document>;

export default WithState;
