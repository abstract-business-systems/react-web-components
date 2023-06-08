import { React } from 'react';
import { find } from '@laufire/utils/collection.js';
import CheckBox from './CheckBoxWrapper';
import TextFieldWrapper from './TextFieldWrapper';
import { nothing } from '@laufire/utils/fn';

const formatList = {};
const typeList = { boolean: CheckBox };

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
	const {
		value, schema: { format, type },
		schema, validate, onChange = nothing,
	} = context;

	const component = format || type;
	const schemaType = getType(schema);

	const props = { value, onChange, component, validate, schemaType, schema };
	const Component = getComponent(schema);

	return <Component { ...props }/>;
};

export default FieldInput;
