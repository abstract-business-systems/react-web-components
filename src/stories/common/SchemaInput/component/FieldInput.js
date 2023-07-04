/* eslint-disable object-shorthand */
import React, { useCallback } from 'react';
import { find } from '@laufire/utils/collection.js';
import Checkbox from './CheckboxWrapper';
import TextFieldWrapper from './TextFieldWrapper';
import transformValue from '../helper/transformValue';
import { identity } from '@laufire/utils/fn';

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
	const { schema: { format, type }, schema, validate: validator } = context;

	const component = format || type;
	const schemaType = getType(schema);
	const transform = transformValue[component] || identity;
	const validate = useCallback((value) => ({
		isValid: validator(transform(value)),
		errors: validator.errors,
	}), [transform]);

	const props = { ...context, component, schemaType, validate };
	const Component = getComponent(schema);

	return <Component { ...props }/>;
};

export default FieldInput;
