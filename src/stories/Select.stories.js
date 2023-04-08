import React from 'react';
import Select from '../stories/common/Select';

export default {
	title: 'stories/DropDown',
	component: Select,
};

export const SelectStories = (args) => <Select { ...args }/>;

SelectStories.args = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	variant: 'standard',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	multiple: true,
	sx: { width: 300 },
	disableUnderline: false,
	value: [],
};
