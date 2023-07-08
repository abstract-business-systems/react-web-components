import React from 'react';
import Checkbox from '../../Checkbox';

const CheckboxWrapper = ({ value, onChange }) =>
	<Checkbox { ...{
		value,
		onChange,
	} }
	/>;

export default CheckboxWrapper;
