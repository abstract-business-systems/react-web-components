import React from 'react';
import QrManager from '../../services/QrManager';
import { TextField } from '@mui/material';
import buildEvent from './helper/buildEvent';
import { identity } from '@laufire/utils/fn';

const QrCodeUpload = ({ onChange = identity, ...props }) =>
	<TextField
		{ ...{
			type: 'file',
			...props,
			onChange: async ({ target: { files }}) => {
				const { data: value, error } = await QrManager
					.getImageData(files[0]);

				onChange(buildEvent({ value, error }));
			},
		} }
	/>;

export default QrCodeUpload;
