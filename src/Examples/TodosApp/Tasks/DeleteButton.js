import React from 'react';
import { Button } from '../../../components/WithContext';

const deleteProps = {
	onClick: {
		action: 'delete',
		entity: 'tasks',
		to: '/taskClient/',
	},
};

const DeleteButton = () =>
	<Button { ...deleteProps }>Delete</Button>;

export default DeleteButton;
