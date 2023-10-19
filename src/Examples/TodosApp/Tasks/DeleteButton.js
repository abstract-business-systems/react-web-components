import React from 'react';
import { Button } from '../../../components/WithContext';
import { Grid } from '@mui/material';

const deleteProps = {
	onClick: {
		action: 'delete',
		entity: 'tasks',
		to: '/taskClient/',
	},
};

const DeleteButton = () =>
	<Grid item={ true } xs={ 2 }>
		<Button { ...deleteProps }>Delete</Button>
	</Grid>;

export default DeleteButton;
