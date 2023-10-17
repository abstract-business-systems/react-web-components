import React from 'react';
import { Button } from '../../components/WithContext';

const deleteProps = {
	onClick: {
		action: 'delete',
		entity: 'todos',
		to: '/todoClient/',
	},
};

const DeleteButton = () =>
	<Button { ...deleteProps }>Delete</Button>;

export default DeleteButton;
