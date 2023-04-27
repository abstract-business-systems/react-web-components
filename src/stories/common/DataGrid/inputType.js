import { React } from 'react';
import * as Icons from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import MultiSelect from './MultiSelect';
import { pick } from '@laufire/utils/collection';
import buildEvent from '../buildEvent';
import PhoneNo from './PhoneNo';
import Integer from './Integer';
import Number from './Number';
import DateTime from './DateTime';
import Time from './Time';
import Date from './Date';

const dataFormatter = {
	enum: (props) => ({
		enum: props.data.items.enum,
	}),
	oneOf: (props) => {
		const array = props.data.items.oneOf;

		return {
			enum: pick(array, 'title'),
		};
	},
};

const Actions = {
	editRow: (rows, value) =>
		rows.map((row) => (row.id !== value.id
			? row
			: { ...row, ...value.row })),

	deleteRow: (rows, value) => rows.filter((row) => row.id !== value.id),
};

const inputType = {
	date: ({ data }) => ({
		minWidth: 200,
		editable: false,
		renderCell: (params) => <Date { ...{ ...params, schema: data } }/>,
	}),
	actions: (props) => ({
		type: props.type,
		editable: false,
		getActions: (params) => {
			const { columns: { actions = {}}, rows, setRows, onChange } = props;

			return actions.map(({ icon, action }) => {
				const Icon = Icons[icon];

				return (
					<GridActionsCellItem
						key={ params.id }
						icon={ <Icon/> }
						label={ icon }
						onClick={ () => {
							setRows(Actions[action](rows, params));
							onChange(buildEvent(params.row));
						} }
					/>);
			});
		},
	}),
	array: (props) => ({
		minWidth: 200,
		renderCell: (params) => {
			const	{ data: { items }} = props;

			const multiSelectType = items.enum ? 'enum' : 'oneOf';

			return (
				<MultiSelect { ...{
					params: params,
					data: dataFormatter[multiSelectType](props),
				} }
				/>);
		},
	}),
	dateTime: ({ data }) => ({
		minWidth: 200,
		editable: false,
		renderCell: (params) =>
			<DateTime { ...{ ...params, schema: data } }/>,
	}),
	time: ({ data }) => ({
		minWidth: 150,
		editable: false,
		renderCell: (params) => <Time { ...{ ...params, schema: data } }/>,
	}),
	integer: ({ data }) => ({
		editable: false,
		renderCell: (params) =>
			<Integer { ...{ ...params, schema: data } }/>,
	}),
	number: ({ data }) => ({
		width: 150,
		editable: false,
		renderCell: (params) =>
			<Number { ...{ ...params,	schema: data } }/>,
	}),
	phoneNo: ({ data }) => ({
		type: 'string',
		width: 150,
		editable: false,
		renderCell: (params) =>
			<PhoneNo { ...{ ...params, schema: data } }/>,
	}),
};

export default inputType;
