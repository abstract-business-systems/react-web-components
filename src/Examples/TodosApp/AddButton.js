import React from 'react';
import { Button } from '../../components/WithState';

const addProps = {
	value: '/transformTodo/',
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

const AddButton = () =>
	<Button { ...addProps }>Add</Button>;

export default AddButton;
