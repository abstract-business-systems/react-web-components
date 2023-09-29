import { React, useRef } from 'react';

const useBeforeLoad = (Cb) => {
	const ref = useRef(false);

	ref.current || <Cb/>;

	ref.current = true;
};

export default useBeforeLoad;
