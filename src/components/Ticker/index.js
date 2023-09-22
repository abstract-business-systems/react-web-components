import buildEvent from '../common/helper/buildEvent';
import { useEffect, useRef } from 'react';

const updateTick = ({ tickRef, onChange }) => {
	tickRef.current += 1;
	onChange(buildEvent({ value: tickRef.current }));
};

const Ticker = ({ count, delay, onChange }) => {
	const tickRef = useRef(0);

	useEffect(() => {
		const interval = setInterval(() => {
			tickRef.current < count
				? updateTick({ tickRef, onChange })
				: clearInterval(interval);
		}, delay);

		return () => clearInterval(interval);
	}, [delay]);

	return null;
};

export default Ticker;
