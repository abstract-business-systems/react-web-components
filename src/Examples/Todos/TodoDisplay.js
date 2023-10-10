import React from 'react';
import ListItem from '../../components/List/ListItem';
import { Display } from '../../components/WithContext';
import { Checkbox } from '../../components/WithState';
import { Box } from '@mui/material';
import DeleteButton from './DeleteButton';

const toggleProps = {
	value: './data/completed/',
	onChange: [
		{},
		{
			to: '/todoClient/',
			action: 'patch',
			entity: 'todos',
			data: './',
		},
	],
};

const TodoDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<Checkbox { ...toggleProps }/>
		<Display value="./data/text/"/>
		<DeleteButton/>
	</Box>
</ListItem>;

export default TodoDisplay;
