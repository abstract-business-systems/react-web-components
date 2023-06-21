import React from 'react';
import { peek } from '@laufire/utils/debug';
import QrCodeGenerator from './common/QrCodeGenerate';

export default {
	title: 'Display/QRCode',
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
		src: { type: 'string' },
		x: { type: 'number' },
		y: { type: 'number' },
		height: { type: 'number' },
		width: { type: 'number' },
		excavate: { type: 'boolean' },
	},
	args: { src: 'https://static.zpao.com/favicon.png' },
};

const Template = ({ onChange, value, ...args }) => {
	const { src, x, y, width, height, excavate, ...rest } = args;
	const imageSettings = { src, x, y, width, height, excavate };

	return (
		<QrCodeGenerator {
			...{ value, onChange, imageSettings, ...rest } }
		/>);
};

export const GenerateQR = Template.bind({});

GenerateQR.args = {
	value: 'hello',
	onClick: peek,
};
