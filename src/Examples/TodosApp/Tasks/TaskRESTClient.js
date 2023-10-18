import React from 'react';
import { RESTClient } from '../../../components/WithState';
import createRndTask from './createRndTask';

const restClientProps = {
	value: { data: { tasks: { data: {}}}},
	name: 'taskClient',
	base: 'http://localhost:3500',
	actions: { createRndTask },
};

const TaskRESTClient = () =>
	<RESTClient { ...restClientProps }/>;

export default TaskRESTClient;
