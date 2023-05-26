import React from 'react';
import { peek } from '@laufire/utils/debug';
import QrCodeScan from './common/QrCodeScan';

export default {
	title: 'Components/QRCode',
	component: QrCodeScan,
	argTypes: {
		facingMode: {
			type: 'select',
			options: ['user', 'environment'],
		},
	},
};

const Template = ({ facingMode, ...args }) =>
	<QrCodeScan { ...{ ...args, constraints: { facingMode }} }/>;

export const ScanQR = Template.bind({});

ScanQR.args = { onChange: peek };
