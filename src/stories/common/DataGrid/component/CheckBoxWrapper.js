import { React } from 'react';
import CheckBox from '../../CheckBox';
import { nothing } from '@laufire/utils/fn';

const CheckBoxWrapper = (context) => {
	const { value, onChange = nothing } = context;

	return (
		<CheckBox { ...{
			value,
			onChange,
		} }
		/>);
};

export default CheckBoxWrapper;
