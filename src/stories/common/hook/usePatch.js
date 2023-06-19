import { useState, useCallback } from 'react';

const usePatch = (initialState) => {
	const [state, setState] = useState(initialState);

	const patchState = useCallback((patch) => {
		setState((prevState) => ({
			...prevState,
			...patch,
		}));
	}, []);

	return [state, patchState];
};

export default usePatch;
