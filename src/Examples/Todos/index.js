import React, { Fragment } from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import {
	Branch, Checkbox,
	Input, RESTClient, Transformation,
} from '../../components/WithState';
import Section from '../../components/Section';
import TodosDisplay, { filters } from './TodosDisplay';
import AddButton from './AddButton';
import FilterBar from './FilterBar';
import EditButton from './EditButton';
import deleteAllEntity from './deleteAllEntity';
import updateAllEntity from './updateAllEntity';
import ClearCompleted from './ClearCompleted';
import { falsy } from '@laufire/utils/predicates';
import { filter, length } from '@laufire/utils/collection';
import { Box } from '@mui/material';
import Tasks from './Tasks';
import moveTaskToTodo from './Tasks/moveTaskToTodo';

const docProps = { initialState };

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

const Todos = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<Box display="flex">
				<Box>
					<RESTClient { ...restClientProps }/>
					<Transformation { ...createTodoProps }/>
					<Transformation { ...isToggleAllProps }/>
					<Checkbox { ...toggleAllProps }/>
					<Branch { ...branchProps }/>
					<TodosDisplay/>
					<FilterBar/>
					<ClearCompleted/>
				</Box>
				<Tasks/>
			</Box>
		</Section>
	</Document>;

export default Todos;
