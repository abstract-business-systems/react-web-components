import React from 'react';
import { Transformation } from '../../../components/WithState';

const createTodoProps = {
	value: {},
	data: '/todo/',
	name: 'transformTodo',
	fn: ({ data }) => ({
		text: data,
		completed: false,
	}),
};

const CreateTodoTransform = () => <Transformation { ...createTodoProps }/>;

export default CreateTodoTransform;
