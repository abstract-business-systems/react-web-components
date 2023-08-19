import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeGenerator = ({ value, renderAs = 'canvas', ...rest }) =>
	<QRCode { ...{ value, renderAs, ...rest } }/>;

export default QrCodeGenerator;
