import React from 'react';
import QrCodeUpload from './common/QrCodeUpload';
import { peek } from '@laufire/utils/debug';

export default {
	title: 'Display/QRCode',
	component: QrCodeUpload,
};

const Template = (args) => <QrCodeUpload { ...args }/>;

export const UploadQr = Template.bind({});

UploadQr.args = {
	inputProps: { accept: '.png, .jpeg' },
	onChange: peek,
};
