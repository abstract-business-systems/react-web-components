import { map } from '@laufire/utils/collection';
import { values } from '@laufire/utils/lib';
import * as Icons from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import * as React from 'react';

const DataType = {
	date: ({ data }) => ({ type: data,
		minWidth: 100,
		valueGetter: ({ value }) => value && new Date(value) }),
	actions: (props) => ({
		type: props.data,
		getActions: (params) => {
			const { actions = {}} = props;

			return actions.map(({ icon, action }) => {
				const Icon = Icons[icon];

				return (
					<GridActionsCellItem
						key={ params.id }
						icon={ <Icon/> }
						label={ icon }
						onClick={ () => action(params) }
					/>);
			});
		},
	}),
};

const singleSelect = (ele) => ele.enum && {
	type: 'singleSelect',
	valueOptions: ele.enum,
};

const getColumns = (props) => {
	const { data, editable, width } = props;

	return values(map(data.properties, (ele, key) => {
		const { format, type } = ele;
		const parameter = format || type;

		return {
			...ele,
			headerName: ele.title,
			field: key,
			editable: editable,
			width: width,
			...singleSelect(ele),
			...DataType[parameter] && DataType[parameter]({ ...props,
				data: parameter }),
		};
	}));
};

export default getColumns;