import React, { useEffect } from 'react';
import Debugger from '../components/Debugger';
import usePatch from '../components/hook/usePatch';

const component = {
	title: 'Hook/UsePatch',
	component: Debugger,

};

export default component;

export const UsePatch = ({ value, patch }) => {
	const [state, patchState] = usePatch(value);

	useEffect(() => {
		patchState(patch);
	}, [patch]);

	return <Debugger { ...{ value: state } }/>;
};

UsePatch.args = {
	value: { a: 1, b: 2, c: 3 },
	patch: {},
};
