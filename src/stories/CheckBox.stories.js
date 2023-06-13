import React from 'react';
import MuiCheckBox from '../stories/common/CheckBox';

const component = {
	title: 'Inputs/CheckBox',
	component: MuiCheckBox,
};

export default component;

const Template = (args) => <MuiCheckBox { ...args }/>;

export const CheckBox = Template.bind({});
// Todo: Args control is not working.
CheckBox.args = {
	checked: true,
	color: 'success',
	defaultChecked: true,
	disabled: false,
	disableRipple: false,
	size: 'small',
	sx: {},
};
