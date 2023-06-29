import React from 'react';
import DataTable from './common/DataGridVTwo';
import config from '../core/config';
import seed from '../core/seed';

const component = {
	title: 'Display',
	component: DataTable,
};

export default component;

const Template = (args) => <DataTable { ...args }/>;

const actions = [
	{
		icon: 'Edit',
		action: 'editRow',
	},
	{
		icon: 'Delete',
		action: 'deleteRow',
	},
];

export const DataGridVTwo = Template.bind({});

DataGridVTwo.args = {
	value: seed.ledgers,
	schema: config.ledgers.properties,
	actions: actions,
};
