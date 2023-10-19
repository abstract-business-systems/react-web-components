import React from 'react';
import { Button } from '../../../components/WithState';
import { Grid } from '@mui/material';

const addProps = {
	onClick: [
		{
			action: 'moveTaskToTodo',
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
	],
};

const AddTodo = () =>
	<Grid item={ true } xs={ 2 }>
		<Button { ...addProps }>+</Button>
	</Grid>;

export default AddTodo;
