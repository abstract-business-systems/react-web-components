import React from 'react';
import { List } from '../../../components/WithState';
import TaskDisplay from './TaskDisplay';

const listProps = {
	value: '/taskClient/data/tasks/',
	Component: TaskDisplay,
	onLoad: [
		{
			to: '/taskClient/',
			action: 'list',
			entity: 'tasks',
		},
	],
};

const TasksDisplay = () =>
	<List { ...listProps }/>;

export default TasksDisplay;
