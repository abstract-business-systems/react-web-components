import React from 'react';
import { filter } from '@laufire/utils/collection';
import { Transformation } from '../../../components/WithState';

export const filters = {
	all: () => true,

	active: ({ data }) => !data.completed,

	completed: ({ data }) => data.completed,
};

const filterTodosProps = {
	value: { data: {}},
	filterTodo: '/filterTodo/',
	data: '/todoClient/data/todos/data/',
	name: 'filterTodos',
	fn: ({ filterTodo, data }) =>
		({ data: filter(data, filters[filterTodo]) }),
};

const FilterTodosTransform = () =>
	<Transformation { ...filterTodosProps }/>;

export default FilterTodosTransform;
