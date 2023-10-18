import React from 'react';
import { Ticker } from '../../../components/WithState';

const createTaskTickerProps = {
	value: 0,
	delay: 1000,
	count: 1,
	onChange: {
		action: 'createRndTask',
		entity: 'tasks',
		to: '/taskClient/',
	},
};

const CreateTaskTicker = () => <Ticker { ...createTaskTickerProps }/>;

export default CreateTaskTicker;
