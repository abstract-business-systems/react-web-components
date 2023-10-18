import React from 'react';
import { RESTClient } from '../../../components/WithState';

const restClientProps = {
	value: { data: { tasks: { data: {}}}},
	name: 'taskClient',
	base: 'http://localhost:3500',
};

const TaskRESTClient = () =>
	<RESTClient { ...restClientProps }/>;

export default TaskRESTClient;
