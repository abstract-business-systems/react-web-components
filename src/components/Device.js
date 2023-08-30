/* eslint-disable max-lines-per-function */
import { useEffect } from 'react';
import '../stories/styles/global.scss';
import { identity } from '@laufire/utils/fn';
import buildEvent from './common/helper/buildEvent';
import {
	isDesktop, isMobileOnly,
	isSmartTV, isTablet, isWearable,
} from 'react-device-detect';
import classify from '../helper/classifier';

// TODO: Need to use classify from js-utils

const getDeviceType = () => {
	const classifiers = {
		mobile: () => isMobileOnly,
		tablet: () => isTablet,
		desktop: () => isDesktop,
		smartTV: () => isSmartTV,
		wearable: () => isWearable,
	};

	const collection = [{}];

	return classify(collection, classifiers);
};

const Device = ({ onChange = identity }) => {
	const handleResize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const orientation = window.matchMedia('(orientation: landscape)')
			.matches
			? 'landscape'
			: 'portrait';
		const device = getDeviceType();
		const connection = navigator.onLine ? 'online' : 'offline';

		onChange(buildEvent({
			value:
			{
				width,
				height,
				orientation,
				device,
				connection,
			},
		}));
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	return null;
};

export default Device;
