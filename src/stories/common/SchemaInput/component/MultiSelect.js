import { React } from 'react';
import dataFormatter from '../dataFormatter';
import MultiSelectWrapper from './MultiSelectWrapper';

const MultiSelect = (context) => {
	const { schema: { items }, value } = context;
	const multiSelectType = items.enum ? 'enum' : 'oneOf';
	const options = dataFormatter[multiSelectType](items);
	const props = { value, options };

	return (
		<MultiSelectWrapper { ...{ ...props, ...context } }/>);
};

export default MultiSelect;
