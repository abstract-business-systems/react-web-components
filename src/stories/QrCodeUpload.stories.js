import React from 'react';
import QrCodeUpload from './common/QrCodeUpload';
import { peek } from '@laufire/utils/debug';

export default {
	title: 'Display/QRCode',
	component: QrCodeUpload,
};

const Template = ({ accept, ...args }) =>
	<QrCodeUpload { ...{ ...args, inputProps: { accept }} }/>;

export const UploadQr = Template.bind({});

UploadQr.args = {
	accept: '.png, .jpeg',
	onChange: peek,
};
