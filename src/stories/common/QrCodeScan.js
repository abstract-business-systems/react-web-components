import React, { useState } from 'react';
import Button from './Button';
import { QrReader } from 'react-qr-reader';
import { nothing } from '@laufire/utils/predicates';
import buildEvent from './helper/buildEvent';

const ScanQRButton = ({ setState, state, onChange }) =>
	<Button { ...{
		onClick: () => {
			const result = { isScanning: !state.isScanning };

			setState(result);
			onChange({ target: { value: { ...state, ...result }}});
		},
	} }
	>
		{ state.isScanning ? 'stop scan' : 'start scan' }
	</Button>;

const ScanQrReader = ({ setState, state, onChange, facingMode, ...args }) => {
	const getResult = (result, error) => ({
		...state,
		...result && { isScanning: false, data: result },
		error,
	});
	const constraints = { facingMode };

	return (
		<QrReader
			{ ...{ ...args, constraints } }
			onResult={ (...data) => {
				const result = getResult(...data);

				// Todo: Check where the isScanning is necessary for onChange.
				onChange(buildEvent({ newValue: result }));
				setState(result);
			} }
		/>);
};

const QrCodeScan = ({ onChange = nothing, ...args }) => {
	const [state, setState] = useState({ isScanning: false });
	const { isScanning } = state;
	const context = { ...args, setState, state, onChange };

	return (
		<div>
			<ScanQRButton { ...{ ...context } }/>
			{ isScanning && <ScanQrReader { ...{ ...context } }/> }
		</div>);
};

export default QrCodeScan;
