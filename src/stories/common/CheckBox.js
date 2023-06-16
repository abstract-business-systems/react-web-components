import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckBox } from '@mui/material';
import PropTypes from 'prop-types';
import { React } from 'react';
import buildEvent from '../common/helper/buildEvent';

const CheckBox = (context) => {
	const { value, onChange = nothing, ...args } = context;

	return (
		<MuiCheckBox { ...{
			checked: value,
			onChange: (evt) =>
				onChange(buildEvent({ newValue: evt.target.checked })),
			...args,
		} }

		/>);
};

export default CheckBox;

CheckBox.propTypes = { context: PropTypes.object };
