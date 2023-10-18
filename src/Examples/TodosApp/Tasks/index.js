import { Box } from '@mui/material';
import React from 'react';
import TasksDisplay from './TasksDisplay';
import TaskRESTClient from './TaskRESTClient';
import Header from './Header';
import CreateTaskTicker from './CreateTaskTicker';

const Tasks = () =>
	<Box>
		<TaskRESTClient/>
		<CreateTaskTicker/>
		<Header/>
		<TasksDisplay/>
	</Box>;

export default Tasks;
