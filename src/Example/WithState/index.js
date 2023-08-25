import React from 'react';
import { Input, Select } from '../../components/WithState';
import Document from '../../components/Document';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import GlobalContext from '../../components/Document/GlobalContext';
import Button from '../../components/Button';

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

const ButtonContainer = () => <GlobalContext.Consumer>
	{ ({ sendMessage }) => {
		const onClick = () => {
			sendMessage({
				to: '/parentOne/apiClient/',
				action: 'list', entity: 'state',
			});
		};

		return <Button { ...{ onClick } }/>;
	} }
</GlobalContext.Consumer>;

const WithState = () =>
	<Document { ...{
		initialState: {
			a: { b: { c: '' }},
			b: { c: { d: ['ten'] }},
			todo: [{ a: 1 }],
			multiple: false,
		},
	} }
	>
		<Input { ...inputProps }/>
		<Select { ...selectProps }/>
		<Section label="ParentOne" name="parentOne">
			<RESTClient name="apiClient" base="url"/>
			<ButtonContainer/>
		</Section>
	</Document>;

export default WithState;
