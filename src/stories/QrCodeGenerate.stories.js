import React from 'react';
import { peek } from '@laufire/utils/debug';
import QrCodeGenerator from './common/QrCodeGenerate';

export default {
	title: 'Components/QRCode',
	component: QrCodeGenerator,
	argTypes: {
		value: { type: 'string' },
		style: { type: 'object' },
		size: { type: 'number' },
		includeMargin: { type: 'boolean' },
		bgColor: { control: 'color' },
		fgColor: { control: 'color' },
		level: {
			type: 'select',
			options: ['L', 'M', 'Q', 'H'],
		},
		renderAs: {
			type: 'select',
			options: ['canvas', 'svg'],
		},
		// Todo: ImageSettings value should be added.
		imageSettings: { type: 'object' },
	},
};

const Template = ({ onChange, value, ...args }) =>
	<QrCodeGenerator { ...{ value, onChange, ...args } }/>;

export const GenerateQR = Template.bind({});

GenerateQR.args = {
	value: 'hello',
	onClick: peek,
};
