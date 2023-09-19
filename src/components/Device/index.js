import { useEffect } from 'react';
import '../../stories/styles/global.scss';
import { identity } from '@laufire/utils/fn';
import buildEvent from '../common/helper/buildEvent';
import {
	isDesktop, isMobileOnly,
	isSmartTV, isTablet, isWearable,
} from 'react-device-detect';
import classify from '../../helper/classifier';
import { map } from '@laufire/utils/collection';

// TODO: Need to use classify from js-utils

const classifiers = {
	mobile: () => isMobileOnly,
	tablet: () => isTablet,
	desktop: () => isDesktop,
	smartTV: () => isSmartTV,
	wearable: () => isWearable,
};

const events = ['resize', 'online', 'offline'];

const getProps = () => {
	const { innerWidth: width, innerHeight: height } = window;
	const orientation = window.matchMedia('(orientation: landscape)')
		.matches
		? 'landscape'
		: 'portrait';
	const device = classify({ classifiers });
	const connection = navigator.onLine ? 'online' : 'offline';

	return { width, height, orientation, device, connection };
};

const Device = ({ onChange = identity }) => {
	const handleResize = () =>
		onChange(buildEvent({ value: { ...getProps() }}));

	useEffect(() => {
		handleResize();
		map(events, (event) => window.addEventListener(event, handleResize));
	}, []);

	return null;
};

export default Device;
