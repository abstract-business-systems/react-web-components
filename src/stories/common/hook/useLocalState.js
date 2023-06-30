import { useCallback, useState } from 'react';
import { identity } from '@laufire/utils/fn';

const useLocalState = (value, fn = identity) => {
	const [state, setState] = useState(value);

	const executeFn = useCallback(() => fn, [fn]);

	executeFn();

	return [state, setState];
};

export default useLocalState;
