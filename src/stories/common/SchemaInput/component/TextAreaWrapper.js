import React from 'react';
import TextArea from '../../TextArea';

const TextAreaWrapper = ({ value, onChange }) =>
	<TextArea { ...{
		onChange,
		value,
	} }
	/>;

export default TextAreaWrapper;
