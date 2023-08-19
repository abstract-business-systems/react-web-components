import React from 'react';
import Input from '../../Input';
import buildEvent from '../../common/helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const DefaultInput = ({ value: initialValue, onChange = nothing }) =>
	<Input { ...{
		InputProps: { disableUnderline: true },
		variant: 'standard',
		onChange: ({ target: { value }}) =>
			onChange(buildEvent({ value })),
		value: initialValue,
	} }
	/>;

export default DefaultInput;
