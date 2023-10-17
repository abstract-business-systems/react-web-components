import React from 'react';
import { Box } from '@mui/material';
import {
	Branch,
	RESTClient,
	Transformation,
} from '../../../components/WithState';
import TodosDisplay from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import deleteAllEntity from './deleteAllEntity';
import updateAllEntity from './updateAllEntity';
import moveTaskToTodo from '../Tasks/moveTaskToTodo';
import EditTodo from './EditTodo';
import AddTodo from './AddTodo';
import ToggleAll from './ToggleAll';

const restClientProps = {
	value: { data: { todos: { data: {}}}},
	name: 'todoClient',
	base: 'http://localhost:3500',
	actions: {
		deleteAll: deleteAllEntity,
		updateAll: updateAllEntity,
		moveTaskToTodo: moveTaskToTodo,
	},
};

const branchProps = {
	options: {
		add: AddTodo,
		edit: EditTodo,
	},
	value: '/editing/status/',
};

const createTodoProps = {
	value: {},
	data: '/todo/',
	name: 'transformTodo',
	fn: ({ data }) => ({
		text: data,
		completed: false,
	}),
};

const Todos = () => <Box>
	<RESTClient { ...restClientProps }/>
	<Transformation { ...createTodoProps }/>
	<ToggleAll/>
	<Branch { ...branchProps }/>
	<TodosDisplay/>
	<FilterBar/>
	<ClearCompleted/>
</Box>;

export default Todos;
