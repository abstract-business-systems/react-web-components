import { useMemo, useState } from 'react';

const defaultRefreshRate = 200;

const Debounce = ({ children, refreshRate = defaultRefreshRate }) => {
	const [lastRender, setLastRender] = useState(Date.now());

	const shouldRender = (Date.now() - lastRender) > refreshRate ;

	shouldRender && setLastRender(Date.now());

	const memoized = useMemo(() => children, [lastRender]);

	return memoized;
};

export default Debounce;
