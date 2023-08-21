import React from 'react';
import { Input, Select } from '../components/WithState';
import Document from '../components/Document';

const selectProps = {
	value: '/b/c/d/',
	multiple: '/multiple/',
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

const Example = () =>
	<Document { ...{
		initialState: {
			a: { b: { c: '' }},
			b: { c: { d: [] }},
			todo: [{ a: 1 }],
			multiple: false,
		},
	} }
	>
		<Input value="/a/b/c/"/>
		<Select { ...selectProps }/>
	</Document>;

export default Example;
