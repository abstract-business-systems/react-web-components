import React, { Fragment } from 'react';
import { List } from '../../../components/WithState';
import TodoDisplay from './TodoDisplay';
import FilterTodosTransform from './FilterTodosTransform';

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

const TodosDisplay = () =>
	<Fragment>
		<FilterTodosTransform/>
		<List { ...listProps }/>
	</Fragment>;

export default TodosDisplay;
