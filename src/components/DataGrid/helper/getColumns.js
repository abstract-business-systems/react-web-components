import React from 'react';
import { map, values } from '@laufire/utils/collection';
import inputType from './inputType';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../common/helper/buildEvent';
import SchemaInput from '../../SchemaInput/index';

const formatMap = {
	'date-time': 'dateTime',
	'date': 'date',
	'time': 'time',
	'phoneNo': 'phoneNo',
};

const getRenderCellProp = ({ ele, key, columns: { editable, width }}) => ({
	...ele,
	headerName: ele.title,
	field: key,
	editable: editable,
	width: width,
});

const widgetMap = { password: 'password' };

const SchemaInputComponent = ({ row, field, value, ele, onChange = nothing }) =>
	<SchemaInput { ...{
		value: value, schema: ele,
		onChange: (evt) => {
			onChange(buildEvent({
				value: {
					...row,
					[field]: evt.target.value,
				},
				error: evt.target.error,
			}));
		},
	} }
	/>;

const getColumns = (args) => {
	const { columns: { data }} = args;

	return values(map(data.properties, (ele, key) => {
		const { format, widget, type } = ele;
		const component = widgetMap[widget] || formatMap[format] || type;
		const getColumnProps = inputType[component] || nothing;
		const props = { ele, key, ...args };

		return {
			...getRenderCellProp(props),
			renderCell: (params) =>
				SchemaInputComponent({ ...props, ...params }),
			...getColumnProps(),
		};
	}));
};

export default getColumns;
