import React from 'react';
import MuiSwitch from '../../Switch';
import { nothing } from '@laufire/utils/fn';

const SwitchWrapper = ({ value, onChange = nothing }) =>
	<MuiSwitch { ...{
		onChange,
		value,
	} }
	/>;

export default SwitchWrapper;
