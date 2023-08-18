import { useCallback, useState } from 'react';
import { identity } from '@laufire/utils/fn';

const useFollowState = (preValue, fn = identity) => {
	const [state, setState] = useState(preValue);

	const executeFn = useCallback((data) => fn(data), [fn]);
	const set = (curValue) => {
		setState(curValue);
		executeFn({ preValue, curValue });
	};

	return [state, set];
};

export default useFollowState;
