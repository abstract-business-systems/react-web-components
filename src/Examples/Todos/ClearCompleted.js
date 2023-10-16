import React from 'react';
import { Button } from '../../components/WithState';

const clearCompletedProps = {
	onClick: {
		action: 'deleteAll',
		entity: 'todos',
		to: '/todoClient/',
		data: '/filterTodos/data/',
	},
};

const ClearCompleted = () =>
	<Button { ...clearCompletedProps }>ClearCompleted</Button>;

export default ClearCompleted;
