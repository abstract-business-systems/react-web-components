import React from 'react';
import DataGrid from '../stories/common/DataGrid/index';

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

const style = {
	width: '100%',
	height: 400,
};

const Journal = (context) => {
	const { data: { collection }, config, state } = context;

	return (
		<DataGrid { ...{
			value: state[collection],
			columns: {
				width: 80,
				editable: true,
				data: config[collection],
				actions: actions,
			},
			style: style,
		} }
		/>);
};

export default Journal;
