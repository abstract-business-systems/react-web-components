import buildEvent from '../common/helper/buildEvent';
import { useEffect } from 'react';

const Ticker = ({ count, onChange, delay, onLoad }) => {
	let tick = 0;

	useEffect(() => {
		onLoad(buildEvent({ value: tick }));
	}, []);

	const interval = setInterval(() => {
		tick += 1;
		onChange(buildEvent({ value: tick }));
	}, delay);

	count <= tick || clearInterval(interval);

	return null;
};

export default Ticker;
