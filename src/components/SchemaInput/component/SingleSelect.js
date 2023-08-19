import React, { useState } from 'react';
import Select from '../../Select';
import buildEvent from '../../common/helper/buildEvent';
import { nothing } from '@laufire/utils/fn';
import getSelectProp from '../helper/getSelectProp';
import getOptions from '../helper/getOptions';

const generateOnChange = (props) =>
	({ target: { value }}) => {
		const { setUserInput, onChange = nothing } = props;

		setUserInput(value);
		onChange(buildEvent({ value }));
	};

const SingleSelectWrapper = (args) => {
	const { schema, schema: { labels }, value } = args;
	const [userInput, setUserInput] = useState(value);

	return (
		<Select { ...{
			options: getOptions(schema, labels),
			value: userInput,
			schema: schema,
			onChange: generateOnChange({ setUserInput, ...args }),
			...getSelectProp(schema),
		} }
		/>);
};

export default SingleSelectWrapper;
