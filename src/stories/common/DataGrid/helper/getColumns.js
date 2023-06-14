import React from 'react';
import { map, values } from '@laufire/utils/collection';
import inputType from './inputType';
import { nothing } from '@laufire/utils/fn';
import SchemaInput from '../SchemaInput';
import buildEvent from '../../helper/buildEvent';

const formatMap = {
	'date-time': 'dateTime',
	'date': 'date',
	'time': 'time',
	'phoneNo': 'phoneNo',
};

const getRenderCellProp = (
	ele, key, { editable, width }
) => ({
	...ele,
	headerName: ele.title,
	field: key,
	editable: editable,
	width: width,
});

const widgetMap = { password: 'password' };

const SchemaInputComponent = (
	params, ele, onChange
) => {
	const { row, field, value } = params;

	return (
		<SchemaInput { ...{
			value: value, schema: ele,
			onChange: (evt) => {
				onChange(buildEvent({
					newValue: {
						...row,
						[field]: evt.target.value,
					},
				}));
			},
		} }
		/>);
};

const getColumns = (props) => {
	const { columns: { data }, columns, onChange = nothing } = props;

	return values(map(data.properties, (ele, key) => {
		const { format, widget, type } = ele;
		const component = widgetMap[widget] || formatMap[format] || type;
		const getColumnProps = inputType[component] || nothing;

		return {
			...getRenderCellProp(
				ele, key, columns
			),
			renderCell: (params) => SchemaInputComponent(
				params, ele, onChange
			),
			...getColumnProps(),
		};
	}));
};

export default getColumns;
