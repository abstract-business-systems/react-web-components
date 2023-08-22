import React from 'react';
import { Input, Select } from '../components/WithState';
import Document from '../components/Document';

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
		<Input { ...inputProps }/>
		<Select { ...selectProps }/>
	</Document>;

export default Example;
