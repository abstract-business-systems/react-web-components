import { Box } from '@mui/material';
import React from 'react';
import TasksDisplay from './TasksDisplay';
import TaskRESTClient from './TaskRESTClient';

const Tasks = () =>
	<Box>
		<Box textAlign="center">Tasks</Box>
		<TaskRESTClient/>
		<TasksDisplay/>
	</Box>;

export default Tasks;
