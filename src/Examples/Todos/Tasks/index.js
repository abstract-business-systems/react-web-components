import { Box } from '@mui/material';
import React from 'react';
import { RESTClient } from '../../../components/WithState';

const restClientProps = {
	value: { data: { tasks: { data: {}}}},
	name: 'taskClient',
	base: 'http://localhost:3500',
};

const Tasks = () =>
	<Box>
		<Box textAlign="center">Tasks</Box>
		<RESTClient { ...restClientProps }/>
	</Box>;

export default Tasks;
