import React from 'react';
import MuiTextArea from '../components/TextArea';

const component = {
	title: 'Inputs/TextArea',
	component: MuiTextArea,
};

export default component;

const Template = (args) =>
	<MuiTextArea { ... args }/>;

export const TextArea = Template.bind({});

TextArea.args = {
	minRows: 3,
	placeholder: 'Hi',
};
