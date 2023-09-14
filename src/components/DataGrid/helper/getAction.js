import React from 'react';
import * as Icons from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import buildEvent from '../../common/helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const Actions = {
	editRow: (rows, value) => rows.map((row) => (row.data.id !== value.id
		? row
		: { ...row, data: value })),

	deleteRow: (rows, value) => rows.filter((row) => row.data.id !== value.id),
};

const getActionItems = (props) => {
	const {
		columns: { actions = [] }, rows,
		userInput: { target: { value, error }}, onChange = nothing, setRows,
	} = props;

	return actions.map(({ icon, action }, key) => {
		const Icon = Icons[icon];
		const UserAction = Actions[action](rows, value);

		return (
			<GridActionsCellItem
				key={ key }
				icon={ <Icon/> }
				label={ icon }
				onClick={ () => {
					setRows(UserAction);
					onChange(buildEvent({ value: UserAction, error: error }));
				} }
			/>);
	});
};

const getAction = (props) => [
	{
		type: 'actions',
		editable: false,
		field: 'Action',
		getActions: (params) => getActionItems(props, params),
	},
];

export default getAction;
