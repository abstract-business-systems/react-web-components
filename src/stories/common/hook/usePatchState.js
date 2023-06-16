import { useState, useCallback } from 'react';

const usePatchState = (initialState) => {
	const [state, setState] = useState(initialState);

	const patchState = useCallback((patch) => {
		setState((prevState) => ({
			...prevState,
			...patch,
		}));
	}, []);

	return [state, patchState];
};

export default usePatchState;
