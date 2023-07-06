import React from 'react';
import Checkbox from '../../Checkbox';
import { nothing } from '@laufire/utils/fn';

const CheckboxWrapper = ({ value, onChange = nothing }) =>
	<Checkbox { ...{
		value,
		onChange,
	} }
	/>;

export default CheckboxWrapper;
