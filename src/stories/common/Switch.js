import PropTypes from 'prop-types';
import { Switch as MuiSwitch } from '@mui/material';
import { React } from 'react';
import { nothing } from '@laufire/utils/fn';

const Switch = (context) => {
	const { checked, onChange = nothing, ...args } = context;

	return (
		<MuiSwitch
			checked={ checked }
			onChange={ (evt) => {
				onChange(evt);
			} }
			{ ...args }
		/>);
};

export default Switch;

Switch.propTypes = { context: PropTypes.object };
