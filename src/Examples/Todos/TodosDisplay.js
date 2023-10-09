import React from 'react';
import { List } from '../../components/WithState';
import TodoDisplay from './TodoDisplay';

const listProps = {
	value: './todoClient/data/todos/',
	Component: TodoDisplay,
	onLoad: [
		{
			to: '/todoClient/',
			action: 'list',
			entity: 'todos',
		},
	],
};

const TodosDisplay = () =>
	<List { ...listProps }/>;

export default TodosDisplay;
