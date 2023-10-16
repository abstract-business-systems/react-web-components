import React, { Fragment } from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import {
	Branch, Checkbox,
	Input, Transformation,
} from '../../components/WithState';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import TodosDisplay from './TodosDisplay';
import AddButton from './AddButton';
import FilterBar from './FilterBar';
import EditButton from './EditButton';

const docProps = { initialState };

const toggleAllProps = { value: '/toggleAll/' };

const todoInputProps = { value: '/todo/' };

const restClientProps = {
	name: 'todoClient',
	base: 'http://localhost:3500',
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

const Todos = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<RESTClient { ...restClientProps }/>
			<Transformation { ...createTodoProps }/>
			<Checkbox { ...toggleAllProps }/>
			<Branch { ...branchProps }/>
			<TodosDisplay/>
			<FilterBar/>
		</Section>
	</Document>;

export default Todos;
