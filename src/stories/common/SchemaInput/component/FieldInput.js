import React from 'react';
import { find } from '@laufire/utils/collection.js';
import Checkbox from './CheckboxWrapper';
import TextFieldWrapper from './TextFieldWrapper';

const formatList = {};
const typeList = { boolean: Checkbox };

const componentType = {
	format: ({ format }) => formatList[format],
	type: ({ type }) => typeList[type],
	default: () => TextFieldWrapper,
};

const getComponent = (schema) => find(componentType, (component) =>
	component(schema))(schema);

const formatMap = {
	'date-time': 'datetime-local',
	'date': 'date',
	'time': 'time',
	'phoneNo': 'tel',
};

const typeMap = {
	number: 'string',
	integer: 'string',
};
const widgetMap = {
	color: 'color',
	password: 'password',
};

const getType = ({ widget, format, type }) =>
	widgetMap[widget] || formatMap[format] || typeMap[type];

const FieldInput = (context) => {
	const { schema: { format, type }, schema } = context;

	const component = format || type;
	const schemaType = getType(schema);

	const props = { ...context, component, schemaType };
	const Component = getComponent(schema);

	return <Component { ...props }/>;
};

export default FieldInput;
