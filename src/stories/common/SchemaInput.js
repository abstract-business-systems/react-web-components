import React, { useMemo } from 'react';
import DefaultInput from './DataGrid/component/DefaultInput';
import { find, omit } from '@laufire/utils/collection';
import CheckBoxGroup from './DataGrid/component/CheckboxGroupWrapper.js';
import SingleSelect from './DataGrid/component/SingleSelect.js';
import MultiSelect from './DataGrid/component/MultiSelect.js';
import FieldInput from './DataGrid/component/FieldInput.js';
import Switch from './DataGrid/component/SwitchWrapper.js';
import RadioGroup from './DataGrid/component/RadioWrapper.js';
import Slider from './DataGrid/component/SliderWrapper.js';
import getValidator from './DataGrid/validate/getValidator.js';
import { nothing } from '@laufire/utils/fn.js';

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
	checkbox: FieldInput,
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
	const { schema, onChange = nothing } = props;
	const jsonSchema = omit(schema, ['widget', 'disabled']);
	const validate = useMemo(() => getValidator(jsonSchema), [jsonSchema]);
	const Component = find(componentType, (component) =>
		component(schema))(schema);

	return <Component { ...{ ...props, validate, onChange } }/>;
};

export default SchemaInput;
