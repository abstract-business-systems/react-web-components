import React, { Fragment } from 'react';
import { Button, Transformation } from '../../components/WithState';

const transformationProps = {
	value: {},
	todo: '/todo/',
	name: 'transformTodo',
	fn: ({ todo }) => ({
		text: todo,
		completed: false,
	}),
};

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
			path: '../todo/',
			data: '',
		},
	],
};

const AddButton = () =>
	<Fragment>
		<Transformation { ...transformationProps }/>
		<Button { ...addProps }>Add</Button>
	</Fragment>;

export default AddButton;
