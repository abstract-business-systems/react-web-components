import React, { Fragment } from 'react';
import { filter, length } from '@laufire/utils/collection';
import { Box } from '@mui/material';
import { falsy } from '@laufire/utils/predicates';
import {
	Branch,
	Checkbox,
	Input,
	RESTClient,
	Transformation,
} from '../../../components/WithState';
import TodosDisplay, { filters } from './TodosDisplay';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';
import deleteAllEntity from './deleteAllEntity';
import updateAllEntity from './updateAllEntity';
import moveTaskToTodo from '../Tasks/moveTaskToTodo';
import AddButton from './AddButton';
import EditButton from './EditButton';

const toggleAllProps = {
	value: '/toggleAll/',
	onChange: [
		{ to: '/' },
		{
			action: 'updateAll',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
	],
};

const todoInputProps = { value: '/todo/' };

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

const AddTodo = () => <Fragment>
	<Input { ...todoInputProps }/>
	<AddButton/>
</Fragment>;

const editTodoProps = { value: '/editing/data/data/text/' };

const EditTodo = () => <Fragment>
	<Input { ...editTodoProps }/>
	<EditButton/>
</Fragment>;

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
const isToggleAllProps = {
	data: '/filterTodos/data/',
	onChange: { path: '/toggleAll/' },
	fn: ({ data = {}}) => falsy(length(filter(data, filters.active))),
};

const Todos = () => <Box>
	<RESTClient { ...restClientProps }/>
	<Transformation { ...createTodoProps }/>
	<Transformation { ...isToggleAllProps }/>
	<Checkbox { ...toggleAllProps }/>
	<Branch { ...branchProps }/>
	<TodosDisplay/>
	<FilterBar/>
	<ClearCompleted/>
</Box>;

export default Todos;
