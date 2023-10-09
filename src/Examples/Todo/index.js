import React from 'react';
import Document from '../../components/Document';
import initialState from './initialState';
import { Checkbox } from '../../components/WithState';

const docProps = { initialState };

const toggleAllProps = { value: '/toggleAll/' };

const Todo = () =>
	<Document { ...docProps }>
		<Checkbox { ...toggleAllProps }/>
	</Document>;

export default Todo;