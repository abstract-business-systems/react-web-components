import React from 'react';
import { Box } from '@mui/material';
import TodosDisplay from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import ToggleAll from './ToggleAll';
import TodoRESTClient from './TodoRESTClient';
import CreateTodoTransform from './CreateTodoTransform';
import InputPanel from './InputPanel';
import Header from './Header';

const Todos = () =>
	<Box>
		<TodoRESTClient/>
		<CreateTodoTransform/>
		<Header/>
		<ToggleAll/>
		<InputPanel/>
		<TodosDisplay/>
		<FilterBar/>
		<ClearCompleted/>
	</Box>;

export default Todos;
