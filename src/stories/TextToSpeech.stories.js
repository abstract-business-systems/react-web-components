import React from 'react';
import ReactTextToSpeech from '../components/TextToSpeech/index.js';

const component = {
	title: 'Inputs/TextToSpeech',
	component: ReactTextToSpeech,
};

export default component;

const Template = (args) => <ReactTextToSpeech { ...args }/>;

export const TextToSpeech = Template.bind({});

TextToSpeech.args = {	value: 'hello' };
