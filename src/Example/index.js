import React from 'react';
import InputWithState from '../components/withState/InputWithState';
import SelectWithState from '../components/withState/SelectWithState';
import Document from '../components/Document';

const selectProps = {
	value: 'b/c/d',
	multiple: true,
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
		},
	} }
	>
		<InputWithState value="a/b/c"/>
		<SelectWithState { ...selectProps }/>
	</Document>;

export default Example;
