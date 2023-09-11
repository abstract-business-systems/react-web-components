import { useEffect, useMemo, useState } from 'react';

const defaultRefreshRate = 200;

const Debounce = ({ children, refreshRate = defaultRefreshRate }) => {
	const [lastRefresh, setLastRefresh] = useState(Date.now());

	const shouldRender = (Date.now() - lastRefresh) >= refreshRate ;

	shouldRender && setLastRefresh(Date.now());
	useEffect(() => {
		const nextRefreshAt = refreshRate + lastRefresh - Date.now();
		const timeoutId = setTimeout(() => {
			shouldRender && setLastRefresh(Date.now());
		}, nextRefreshAt);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [children, shouldRender]);

	const memoized = useMemo(() => children, [lastRefresh]);

	return memoized;
};

export default Debounce;
