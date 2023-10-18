import React from 'react';
import { Box } from '@mui/material';
import { Branch } from '../../../components/WithState';
import TodosDisplay from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import EditTodo from './EditTodo';
import AddTodo from './AddTodo';
import ToggleAll from './ToggleAll';
import TodoRESTClient from './TodoRESTClient';
import CreateTodoTransform from './CreateTodoTransform';

const branchProps = {
	options: {
		add: AddTodo,
		edit: EditTodo,
	},
	value: '/editing/status/',
};

const Todos = () => <Box>
	<TodoRESTClient/>
	<CreateTodoTransform/>
	<ToggleAll/>
	<Branch { ...branchProps }/>
	<TodosDisplay/>
	<FilterBar/>
	<ClearCompleted/>
</Box>;

export default Todos;
