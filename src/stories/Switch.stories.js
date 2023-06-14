import { React, useState } from 'react';
import MuiSwitch from '../stories/common/Switch';

const component = {
	title: 'Inputs/Switch',
	component: MuiSwitch,
};

export default component;

const Template = (args) => {
	const [value, setValue] = useState(true);

	return (
		<MuiSwitch { ...{
			onChange: (evt) => setValue(evt.target.checked),
			checked: value,
			...args,
		} }
		/>);
};

export const Switch = Template.bind({});

Switch.args = {
	size: 'large',
	color: 'success',
	disabled: false,
};
