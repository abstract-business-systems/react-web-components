import React, { Fragment } from 'react';
import { List, Transformation } from '../../components/WithState';
import TodoDisplay from './TodoDisplay';
import { filter } from '@laufire/utils/collection';

const listProps = {
	value: '/filterTodos/',
	Component: TodoDisplay,
	onLoad: [
		{
			to: '/todoClient/',
			action: 'list',
			entity: 'todos',
		},
	],
};

export const filters = {
	all: () => true,

	active: ({ data }) => !data.completed,

	completed: ({ data }) => data.completed,
};

const filterTodosProps = {
	value: { data: {}},
	filterTodo: '/filterTodo/',
	data: '/todoClient/data/todos/data/',
	name: 'filterTodos',
	fn: ({ filterTodo, data }) =>
		({ data: filter(data, filters[filterTodo]) }),
};

const TodosDisplay = () =>
	<Fragment>
		<Transformation { ...filterTodosProps }/>
		<List { ...listProps }/>
	</Fragment>;

export default TodosDisplay;
