import { Box } from '@mui/material';
import React from 'react';
import TasksDisplay from './TasksDisplay';
import TaskRESTClient from './TaskRESTClient';
import Header from './Header';

const Tasks = () =>
	<Box>
		<Header/>
		<TaskRESTClient/>
		<TasksDisplay/>
	</Box>;

export default Tasks;
