import React, { Fragment } from 'react';
import TodosDisplay from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import TodoRESTClient from './TodoRESTClient';
import CreateTodoTransform from './CreateTodoTransform';
import InputPanel from './InputPanel';
import Header from './Header';

const Todos = () =>
	<Fragment>
		<TodoRESTClient/>
		<CreateTodoTransform/>
		<Header/>
		<InputPanel/>
		<TodosDisplay/>
		<FilterBar/>
		<ClearCompleted/>
	</Fragment>;

export default Todos;
