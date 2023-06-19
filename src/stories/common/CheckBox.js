import { nothing } from '@laufire/utils/fn';
import { Checkbox as MuiCheckBox } from '@mui/material';
import { React } from 'react';
import buildEvent from './helper/buildEvent';

const CheckBox = (context) => {
	const { value, onChange = nothing, ...args } = context;

	return (
		<MuiCheckBox { ...{
			checked: value,
			onChange: ({ target: { checked }}) =>
				onChange(buildEvent({ newValue: checked })),
			...args,
		} }

		/>);
};

export default CheckBox;
