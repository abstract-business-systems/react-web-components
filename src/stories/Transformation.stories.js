import React from 'react';
import { Transformation as TransformationComponent }
	from '../components/WithState';
import Document from '../components/Document';
import { BrowserRouter } from 'react-router-dom';
import { length } from '@laufire/utils/collection';
import { peek } from '@laufire/utils/debug';
import scaffold from '../components/Section/helper/scaffold';

const component = {
	title: 'Transformation',
	component: TransformationComponent,
	argTypes: {
		fn: {
			control: 'select',
			options: [
				'function',
				'string',
				'object',
			],
		},
		data: {
			control: 'select',
			options: [
				'constant',
				'path',
			],
		},
	},
	args: { fn: 'function', data: 'constant' },
};

export default component;

const documentProps = {
	initialState: scaffold('/todos/data', [
		{ todo: 1 },
		{ todo: 2 },
	]),
};

const fnOptions = {
	string: 'not',
	object: { len: (data) => peek(length(data)) },
	function: (data) => peek(data),
};

const dataOptions = {
	constant: [{ todo: 1 }],
	path: './todos/data/',
};

const Template = (args) => {
	const { fn, data } = args;
	const enrichedArgs = { data: dataOptions[data], fn: fnOptions[fn] };

	return <BrowserRouter>
		<Document { ...documentProps }>
			<TransformationComponent { ...{ ...args, ...enrichedArgs } }/>
		</Document>
	</BrowserRouter>;
};

export const Transformation = Template.bind({});

Transformation.args = { name: 'todo' };
