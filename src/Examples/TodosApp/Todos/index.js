import React from 'react';
import { Box } from '@mui/material';
import {
	Branch,
	Transformation,
} from '../../../components/WithState';
import TodosDisplay from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import EditTodo from './EditTodo';
import AddTodo from './AddTodo';
import ToggleAll from './ToggleAll';
import TodoRESTClient from './TodoRESTClient';

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
	<TodoRESTClient/>
	<Transformation { ...createTodoProps }/>
	<ToggleAll/>
	<Branch { ...branchProps }/>
	<TodosDisplay/>
	<FilterBar/>
	<ClearCompleted/>
</Box>;

export default Todos;
