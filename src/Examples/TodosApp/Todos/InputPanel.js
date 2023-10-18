import React from 'react';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import { Branch } from '../../../components/WithState';

const branchProps = {
	options: {
		add: AddTodo,
		edit: EditTodo,
	},
	value: '/editing/status/',
};

const InputPanel = () =>
	<Branch { ...branchProps }/>;

export default InputPanel;
