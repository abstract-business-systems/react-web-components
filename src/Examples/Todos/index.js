import React from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import { Checkbox, Input, Transformation } from '../../components/WithState';
import Section from '../../components/Section';
import RESTClient from '../../components/RESTClient';
import TodosDisplay from './TodosDisplay';
import AddButton from './AddButton';
import { filter } from '@laufire/utils/collection';
import FilterButton from './FilterButton';

const docProps = { initialState };

const toggleAllProps = { value: '/toggleAll/' };

const todoInputProps = { value: '/todo/' };

const restClientProps = {
	name: 'todoClient',
	base: 'http://localhost:3500',
};

const filters = {
	all: () => true,

	active: ({ data }) => !data.completed,

	completed: ({ data }) => data.completed,
};

const filterTodosProps = {
	value: { data: {}},
	filterTodo: '/filterTodo/',
	todos: '/todoClient/data/todos/data/',
	name: 'filterTodos',
	fn: ({ filterTodo, todos }) =>
		({ data: filter(todos, filters[filterTodo]) }),
};

const Todos = () =>
	<Document { ...docProps }>
		<Section { ...{ label: 'Todos', name: 'todos' } }>
			<RESTClient { ...restClientProps }/>
			<Checkbox { ...toggleAllProps }/>
			<Input { ...todoInputProps }/>
			<AddButton/>
			<Transformation { ...filterTodosProps }/>
			<TodosDisplay/>
			<FilterButton/>
		</Section>
	</Document>;

export default Todos;
