import React from 'react';
import MuiSwitch from '../../Switch';

const SwitchWrapper = ({ value, onChange }) =>
	<MuiSwitch { ...{
		onChange,
		value,
	} }
	/>;

export default SwitchWrapper;
