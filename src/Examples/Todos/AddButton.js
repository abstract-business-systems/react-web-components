import React, { Fragment } from 'react';
import { Transformation } from '../../components/WithState';
import { Button } from '../../components/WithContext';

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
	onClick: {
		action: 'create',
		entity: 'todos',
		to: '/todoClient/',
	},
};

const AddButton = () =>
	<Fragment>
		<Transformation { ...transformationProps }/>
		<Button { ...addProps }>Add</Button>
	</Fragment>;

export default AddButton;
