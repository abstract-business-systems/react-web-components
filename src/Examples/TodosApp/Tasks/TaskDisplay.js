import React from 'react';
import { Box } from '@mui/material';
import ListItem from '../../../components/List/ListItem';
import { Display } from '../../../components/WithState';
import DeleteButton from './DeleteButton';
import AddTodo from './AddTodo';

const displayProps = { value: './data/text/' };

const TaskDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<AddTodo/>
		<Display { ...displayProps }/>
		<DeleteButton/>
	</Box>
</ListItem>;

export default TaskDisplay;
