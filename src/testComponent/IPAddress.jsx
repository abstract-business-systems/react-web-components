import React, { useEffect, useState } from 'react';
import Debugger from './stories/common/Debugger';

const IPAddress = () => {
	const [ipAddress, setIPAddress] = useState('');

	useEffect(() => {
		fetch('https://geolocation-db.com/json/')
			.then((response) => response.json())
			.then((data) => setIPAddress(data))
			// eslint-disable-next-line no-console
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<Debugger value={ ipAddress }/>
		</div>
	);
};

export default IPAddress;
