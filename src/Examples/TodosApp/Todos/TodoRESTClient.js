import React from 'react';
import { RESTClient } from '../../../components/WithState';
import deleteClearCompleted from './deleteClearCompleted';
import toggleTodos from './toggleTodos';
import moveTaskToTodo from '../Tasks/moveTaskToTodo';

const restClientProps = {
	value: { data: { todos: { data: {}}}},
	name: 'todoClient',
	base: 'http://localhost:3500',
	actions: {
		deleteClearCompleted,
		toggleTodos,
		moveTaskToTodo,
	},
};

const TodoRESTClient = () =>
	<RESTClient { ...restClientProps }/>;

export default TodoRESTClient;
