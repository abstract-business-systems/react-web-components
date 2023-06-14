import { React, useState } from 'react';
import MuiCheckBox from '../stories/common/CheckBox';

const component = {
	title: 'Inputs/CheckBox',
	component: MuiCheckBox,
};

export default component;

const Template = (args) => {
	const [value, setValue] = useState(true);

	return (
		<MuiCheckBox { ...{
			onChange: (evt) => setValue(evt.target.value),
			checked: value,
			...args,
		} }
		/>);
};

export const CheckBox = Template.bind({});

CheckBox.args = {
	color: 'success',
	disabled: false,
	disableRipple: false,
	size: 'small',
	sx: {},
};
