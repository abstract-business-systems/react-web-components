import React from 'react';
import dataFormatter from '../dataFormatter';
import MultiSelectWrapper from './MultiSelectWrapper';

const MultiSelect = (args) => {
	const { schema: { items }} = args;
	const multiSelectType = items.enum ? 'enum' : 'oneOf';
	const options = dataFormatter[multiSelectType](items);

	return (
		<MultiSelectWrapper { ...{ ...args, options } }/>);
};

export default MultiSelect;
