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
};

export default component;

const documentProps = {
	initialState: scaffold('apiClient/data/todos/data', [
		{ todo: 1 },
		{ todo: 2 },
	]),
};

const Template = (args) =>
	<BrowserRouter>
		<Document { ...documentProps }>
			<TransformationComponent { ...args }/>
		</Document>
	</BrowserRouter>;

export const Transformation = Template.bind({});

Transformation.args = {
	data: './apiClient/data/todos/data/',
	name: 'todoCount',
	fn: ({ data }) => peek(length(data)),
	// fn: 'not',
};
