import React from 'react';
import { Button } from '../../components/WithState';

const editProp = {
	value: '/editing/data/',
	onClick: [
		{
			entity: 'todos',
			to: '/todoClient/',
			data: './',
		},
		{
			path: '../status',
			data: 'add',
		},
	],
};

const EditButton = () =>
	<Button { ...editProp }>Edit</Button>;

export default EditButton;
