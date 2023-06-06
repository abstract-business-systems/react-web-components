import React, { useMemo } from 'react';
import DefaultInput from './component/DefaultInput.js';
import { find, omit } from '@laufire/utils/collection';
import CheckBoxGroup from './component/CheckboxGroupWrapper.js';
import SingleSelect from './component/SingleSelect.js';
import MultiSelect from './component/MultiSelect.js';
import FieldInput from './component/FieldInput.js';
import Switch from './component/SwitchWrapper.js';
import RadioGroup from './component/RadioWrapper.js';
import Slider from './component/IntegerRange.js';
import getValidator from './validate/getValidator.js';

const widgetList = {
	slider: Slider,
	checkboxGroup: CheckBoxGroup,
	radioGroup: RadioGroup,
	switch: Switch,
	select: SingleSelect,
	multiSelect: MultiSelect,
	dateTimePicker: FieldInput,
	timePicker: FieldInput,
	datePicker: FieldInput,
	input: FieldInput,
	color: FieldInput,
	password: FieldInput,
};

const componentType = {
	widget: ({ widget }) => widgetList[widget],
	uniqueItems: ({ uniqueItems }) => uniqueItems && MultiSelect,
	enum: ({ enum: Enum }) => Enum && SingleSelect,
	format: ({ format }) => format && FieldInput,
	type: ({ type }) => type && FieldInput,
	default: () => DefaultInput,
};

const SchemaInput = (props) => {
	const { schema } = props;
	const jsonSchema = omit(schema, ['widget', 'disabled']);
	const validate = useMemo(() => getValidator(jsonSchema), []);
	const Component = find(componentType, (component) =>
		component(schema))(schema);

	return <Component { ...{ ...props, validate } }/>;
};

export default SchemaInput;
