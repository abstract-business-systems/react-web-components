import { React } from 'react';
import MuiSwitch from '../../Switch';
import { nothing } from '@laufire/utils/fn';

const SwitchWrapper = (context) => {
	const { value, onChange = nothing } = context;

	return (
		<MuiSwitch { ...{
			onChange,
			value,
		} }
		/>);
};

export default SwitchWrapper;
