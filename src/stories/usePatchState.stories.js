import React, { useEffect } from 'react';
import Debugger from './common/Debugger';
import usePatchState from './common/hook/usePatchState';

const component = {
	title: 'Hook/UsePatchState',
	component: Debugger,

};

export default component;

export const UsePatchState = ({ value, patch }) => {
	const [state, patchState] = usePatchState(value);

	useEffect(() => {
		patchState(patch);
	}, [patch]);

	return <Debugger { ...{ value: state } }/>;
};

UsePatchState.args = {
	value: { a: 1, b: 2, c: 3 },
	patch: {},
};
