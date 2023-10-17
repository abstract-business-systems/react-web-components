import React from 'react';
import { Box } from '@mui/material';
import ListItem from '../../../components/List/ListItem';
import { Display } from '../../../components/WithState';

const displayProps = { value: './data/text/' };

const TaskDisplay = (props) => <ListItem { ...props }>
	<Box display="flex" alignItems="center">
		<Display { ...displayProps }/>
	</Box>
</ListItem>;

export default TaskDisplay;
