import React from 'react';
import { TextareaAutosize } from '@mui/material';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const TextArea = ({ onChange = nothing, ...rest }) =>
	<TextareaAutosize { ...{
		onChange: (evt) =>
			onChange(buildEvent({ value: evt.target.value })),
		...rest,
	} }
	/>;

export default TextArea;
