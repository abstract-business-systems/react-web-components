import { React } from 'react';
import Checkbox from '../../Checkbox';
import { nothing } from '@laufire/utils/fn';

const CheckboxWrapper = (context) => {
	const { value, onChange = nothing } = context;

	return (
		<Checkbox { ...{
			value,
			onChange,
		} }
		/>);
};

export default CheckboxWrapper;
