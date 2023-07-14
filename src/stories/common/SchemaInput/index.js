import React, { useMemo } from 'react';
import DefaultInput from './component/DefaultInput';
import { omit } from '@laufire/utils/collection';
import CheckboxGroup from './component/CheckboxGroupWrapper.js';
import SingleSelect from './component/SingleSelect.js';
import MultiSelect from './component/MultiSelectWrapper';
import FieldInput from './component/FieldInput.js';
import Switch from './component/SwitchWrapper.js';
import RadioGroup from './component/RadioWrapper.js';
import Slider from './component/SliderWrapper.js';
import getValidator from './validate/getValidator.js';
import { nothing } from '@laufire/utils/fn.js';
import ProgressBar from './component/ProgressBarWrapper';
import getComponent from './helper/getComponent';
import Rating from './component/RatingWrapper';
import Pagination from './component/PaginationWrapper';
import TextArea from './component/TextAreaWrapper';

const widgetList = {
	slider: Slider,
	checkboxGroup: CheckboxGroup,
	radioGroup: RadioGroup,
	pagination: Pagination,
	rating: Rating,
	switch: Switch,
	textArea: TextArea,
	select: SingleSelect,
	multiSelect: MultiSelect,
	progressBar: ProgressBar,
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
