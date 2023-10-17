import React from 'react';
import { Button } from '../../../components/WithState';

const addProps = {
	onClick: [
		{
			action: 'moveTaskToTodo',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
		{
			action: 'delete',
			entity: 'tasks',
			to: '/taskClient/',
			data: './',
		},
	],
};

const AddTodo = () =>
	<Button { ...addProps }>+</Button>;

export default AddTodo;
