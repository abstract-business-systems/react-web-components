import React, { Fragment } from 'react';
import { Button, Transformation } from '../../../components/WithState';
import { falsy } from '@laufire/utils/predicates';

const addProps = {
	value: '/transformTodo/',
	disabled: '/isAddTodo/',
	onClick: [
		{
			action: 'create',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
		{
			path: '/todo/',
			data: '',
		},
	],
};

const isAddTodoProps = {
	name: 'isAddTodo',
	value: true,
	data: '/todo/',
	onChange: { path: '/isAddTodo/' },
	fn: ({ data }) => falsy(data),
};

const AddButton = () =>
	<Fragment>
		<Transformation { ...isAddTodoProps }/>
		<Button { ...addProps }>Add</Button>
	</Fragment>;

export default AddButton;
