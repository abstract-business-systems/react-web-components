import React from 'react';
import QrManager from '../../services/QrManager';
import buildEvent from './helper/buildEvent';
import { identity } from '@laufire/utils/fn';
import Input from './Input';

const QrCodeUpload = ({ onChange = identity, ...props }) =>
	<Input
		{ ...{
			type: 'file',
			...props,
			onChange: async ({ target: { value: { files }}}) => {
				const { data: value, error } = await QrManager
					.getImageData(files[0]);

				onChange(buildEvent({ value, error }));
			},
		} }
	/>;

export default QrCodeUpload;
