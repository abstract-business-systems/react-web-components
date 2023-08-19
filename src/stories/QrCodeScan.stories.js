import React from 'react';
import { peek } from '@laufire/utils/debug';
import QrCodeScan from '../components/QrCodeScan';

export default {
	title: 'Display/QRCode',
	component: QrCodeScan,
	argTypes: {
		facingMode: {
			type: 'select',
			options: ['user', 'environment'],
		},
	},
};

const Template = ({ ...args }) =>
	<QrCodeScan { ...{ ...args } }/>;

export const ScanQR = Template.bind({});

ScanQR.args = { onChange: peek };
