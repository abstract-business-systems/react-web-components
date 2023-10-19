import React, { Fragment } from 'react';
import { Input } from '../../../components/WithState';
import EditButton from './EditButton';
import { Grid } from '@mui/material';

const editTodoProps = { value: '/editing/data/data/text/' };

const EditTodo = () => <Fragment>
	<Grid item={ true } xs={ 4 }><Input { ...editTodoProps }/></Grid>
	<Grid item={ true } xs={ 2 }><EditButton/></Grid>
</Fragment>;

export default EditTodo;
