import React, { Fragment } from 'react';
import { Input } from '../../../components/WithState';
import AddButton from './AddButton';

const todoInputProps = { value: '/todo/' };

const AddTodo = () => <Fragment>
	<Input { ...todoInputProps }/>
	<AddButton/>
</Fragment>;

export default AddTodo;
