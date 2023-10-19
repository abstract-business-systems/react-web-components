import React from 'react';
import { Button } from '../../../components/WithState';

const deleteProps = {
	onClick: {
		action: 'delete',
		entity: 'todos',
		to: '/todoClient/',
		data: './',
	},
};

const DeleteButton = () =>
	<Button { ...deleteProps }>Delete</Button>;

export default DeleteButton;
