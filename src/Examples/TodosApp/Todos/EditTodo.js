import React, { Fragment } from 'react';
import { Input } from '../../../components/WithState';
import EditButton from './EditButton';

const editTodoProps = { value: '/editing/data/data/text/' };

const EditTodo = () => <Fragment>
	<Input { ...editTodoProps }/>
	<EditButton/>
</Fragment>;

export default EditTodo;
