import { identity } from '@laufire/utils/fn';
import { useEffect } from 'react';
import buildEvent from '../common/helper/buildEvent';

const Location = ({ onChange = identity, mode = 'watch', options }) => {
	const success = (position) => {
		onChange(buildEvent({ value: position }));
	};

	const error = () => {

	};

	useEffect(() => {
		const watchID = navigator.geolocation.watchPosition(
			success, error, options
		);

		mode === 'current' && navigator.geolocation.clearWatch(watchID);
	}, []);
};

export default Location;
