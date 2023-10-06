import { useRef } from 'react';

const useBeforeLoad = (cb) => {
	const ref = useRef(false);

	ref.current || cb();

	ref.current = true;
};

export default useBeforeLoad;
