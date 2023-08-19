import React, { useMemo } from 'react';
import DefaultInput from './component/DefaultInput';
import SingleSelect from './component/SingleSelect.js';
import MultiSelect from './component/MultiSelectWrapper';
import FieldInput from './component/FieldInput.js';
import getValidator from './validate/getValidator.js';
import { nothing } from '@laufire/utils/fn.js';
import getComponent from './helper/getComponent';
import widgetList from './helper/widgetList';

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
	const validate = useMemo(() => getValidator(schema), [schema]);
	const Component = getComponent(schema, componentType);

	return <Component { ...{ ...props, validate, onChange } }/>;
};

export default SchemaInput;
