import React, { useMemo } from 'react';
import DefaultInput from './component/DefaultInput';
import { omit } from '@laufire/utils/collection';
import CheckBoxGroup from './component/CheckboxGroupWrapper.js';
import SingleSelect from './component/SingleSelect.js';
import MultiSelect from './component/MultiSelectWrapper';
import FieldInput from './component/FieldInput.js';
import Switch from './component/SwitchWrapper.js';
import RadioGroup from './component/RadioWrapper.js';
import Slider from './component/SliderWrapper.js';
import getValidator from './validate/getValidator.js';
import { nothing } from '@laufire/utils/fn.js';
import getComponent from './helper/getComponent';

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
	const Component = getComponent(schema, componentType);

	return <Component { ...{ ...props, validate, onChange } }/>;
};

export default SchemaInput;
