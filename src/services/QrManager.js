import QrScanner from 'qr-scanner';

const QrManager = {
	getImageData: async (data) => {
		const result = await QrScanner.scanImage(data,
			{ returnDetailedScanResult: false })
			.catch((error) => ({ error }));

		return {
			data: result?.data,
			error: result?.error,
		};
	},

};

export default QrManager;
