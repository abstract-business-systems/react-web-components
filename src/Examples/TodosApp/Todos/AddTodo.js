import React, { Fragment } from 'react';
import { Input } from '../../../components/WithState';
import AddButton from './AddButton';
import { Grid } from '@mui/material';

const todoInputProps = { value: '/todo/' };

const AddTodo = () => <Fragment>
	<Grid item={ true } xs={ 4 }>
		<Input { ...todoInputProps }/>
	</Grid>
	<Grid item={ true } xs={ 2 }>
		<AddButton/>
	</Grid>
</Fragment>;

export default AddTodo;
