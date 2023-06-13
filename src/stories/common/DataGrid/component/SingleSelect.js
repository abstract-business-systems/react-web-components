import { React } from 'react';
import SingleSelectWrapper from './SingleSelectWrapper';

const SingleSelect = (context) => {
	const { schema, value } = context;
	const options = schema.enum;
	const props = { options, value };

	return (
		<SingleSelectWrapper { ...{ ...props, ...context } }/>);
};

export default SingleSelect;
