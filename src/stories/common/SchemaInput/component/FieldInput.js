import React, { useCallback } from 'react';
import Checkbox from './CheckboxWrapper';
import TextFieldWrapper from './TextFieldWrapper';
import transformValue from '../helper/transformValue';
import { identity } from '@laufire/utils/fn';
import getComponent from '../helper/getComponent';

const formatList = {};
const typeList = { boolean: Checkbox };

const componentType = {
	format: ({ format }) => formatList[format],
	type: ({ type }) => typeList[type],
	default: () => TextFieldWrapper,
};

// TODO: Discuss the various ways to improve the code below.

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

const FieldInput = (args) => {
	const { schema: { format, type }, schema, validate: validator } = args;

	const component = format || type;
	const schemaType = getType(schema);
	// TODO: Change transformValue to proper name.
	const transform = transformValue[component] || identity;
	const validate = useCallback((value) => ({
		isValid: validator(transform(value)),
		errors: validator.errors,
	}), [transform]);

	const props = { ...args, component, schemaType, validate };
	const Component = getComponent(schema, componentType);

	return <Component { ...props }/>;
};

export default FieldInput;
