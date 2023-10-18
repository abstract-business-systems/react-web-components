import React, { Fragment } from 'react';
import { Button, Transformation } from '../../../components/WithState';
import { falsy } from '@laufire/utils/predicates';
import { filter, length } from '@laufire/utils/collection';
import { filters } from './FilterTodosTransform';

const clearCompletedProps = {
	disabled: '/clearCompleted/',
	onClick: {
		action: 'deleteClearCompleted',
		entity: 'todos',
		to: '/todoClient/',
		data: '/filterTodos/data/',
	},
};

const isDisableProps = {
	value: true,
	name: 'clearCompleted',
	data: '/filterTodos/data/',
	fn: ({ data }) => falsy(length(filter(data, filters.completed))),
};

const ClearCompleted = () =>
	<Fragment>
		<Transformation { ...isDisableProps }/>
		<Button { ...clearCompletedProps }>ClearCompleted</Button>
	</Fragment>;

export default ClearCompleted;
