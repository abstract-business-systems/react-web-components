import { map, merge } from '@laufire/utils/collection';
import { useEffect, React } from 'react';
import buildEvent from '../common/helper/buildEvent';
import { identity } from '@laufire/utils/fn';

const permissionNames = [
	'camera',
	'microphone',
	'geolocation',
	'notifications',
	'midi',
	'clipboard-read',
	'clipboard-write',
	'magnetometer',
	'accelerometer',
	'gyroscope',
	'background-sync',
	'payment-handler',
	'background-fetch',
	'display-capture',
	'persistent-storage',
];

const queryStatus = async (permissionName) => {
	const permissionStatus = await navigator
		.permissions.query({ name: permissionName });

	return permissionStatus;
};

const Permissions = ({ onChange = identity, onLoad = identity, value }) => {
	useEffect(async () => {
		const permissionsStatus = await Promise
			.all(map(permissionNames, queryStatus));

		const res = map(permissionsStatus, (permissionStatus) => {
			const { name } = permissionStatus;

			permissionStatus.onchange = ({ target: { state }}) =>
				onChange(buildEvent({ value: { [name]: state }}));

			return { [name]: permissionStatus.state };
		});

		onLoad(buildEvent({ value: merge({}, ...res) }));
	}, []);

	const requestPermission = () => {

	};

	value && requestPermission();

	return <div/>;
};

export default Permissions;
