import React from 'react';
import { Box } from '@mui/material';
import ListItem from '../../../components/List/ListItem';
import { Display } from '../../../components/WithState';
import DeleteButton from './DeleteButton';

const displayProps = { value: './data/text/' };

const TaskDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<Display { ...displayProps }/>
		<DeleteButton/>
	</Box>
</ListItem>;

export default TaskDisplay;
