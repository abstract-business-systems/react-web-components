import React from 'react';
import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import { Branch } from '../../../components/WithState';
import { Grid } from '@mui/material';
import ToggleAll from './ToggleAll';

const branchProps = {
	options: {
		add: AddTodo,
		edit: EditTodo,
	},
	value: '/editing/status/',
};

const InputPanel = () =>
	<Grid
		container={ true }
		justifyContent="center"
		alignItems="center"
	>
		<Grid item={ true } xs={ 1 }><ToggleAll/></Grid>
		<Branch { ...branchProps }/>
	</Grid>;

export default InputPanel;
