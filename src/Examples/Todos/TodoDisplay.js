import React from 'react';
import ListItem from '../../components/List/ListItem';
import { Checkbox, Display } from '../../components/WithState';
import { Box } from '@mui/material';
import DeleteButton from './DeleteButton';

const toggleProps = {
	value: './data/completed/',
	onChange: [
		{
			to: '/',
			action: 'patch',
		},
		{
			to: '/todoClient/',
			action: 'patch',
			entity: 'todos',
			data: '../../',
		},
	],
};

const displayProps = { value: './data/text/' };

const TodoDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<Checkbox { ...toggleProps }/>
		<Display { ...displayProps }/>
		<DeleteButton/>
	</Box>
</ListItem>;

export default TodoDisplay;
