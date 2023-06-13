import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckBox } from '@mui/material';
import PropTypes from 'prop-types';
import { React } from 'react';

const CheckBox = (context) => {
	const { value, onChange = nothing } = context;

	return (
		<MuiCheckBox
			checked={ value }
			onChange={ (evt) => onChange(evt) }
		/>);
};

export default CheckBox;

CheckBox.propTypes = { context: PropTypes.object };
