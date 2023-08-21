import React from 'react';
import InputWithState from '../components/withState/InputWithState';
import Document from '../components/Document';

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
	</Document>;

export default Example;
