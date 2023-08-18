import { useEffect, React } from 'react';
import '../styles/global.scss';
import { identity } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';
import getScreenSize from './helper/screenSize';

const maxMobileWidth = 640;

const Device = ({ onChange = identity }) => {
	const handleResize = () => {
		const { width, height } = getScreenSize();
		const orientation = window.matchMedia('(orientation: landscape)')
			.matches
			? 'landscape'
			: 'portrait';

		const device = width < maxMobileWidth ? 'mobile' : 'web';

		onChange(buildEvent({ value: { width, height, orientation, device }}));
	};

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
	}, []);

	return <div/>;
};

export default Device;
