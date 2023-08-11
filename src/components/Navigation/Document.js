import React, { useEffect, useMemo, useState } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { keys, map, merge } from '@laufire/utils/collection';
import { NavContext } from './NavContext';
import { identity } from '@laufire/utils/fn';

const generateDataProcessor = (state, setState) => {
	const onLoad = ({ option }) => {
		setState((pre) => merge(
			{}, pre, option
		),);
	};

	const patch = (evt) => {
		map(evt, (value, key) => {
			setState({ ...state, [key]: value });
		});
	};

	return { onLoad, state, patch };
};

const getCurrLocation = (pathname) => pathname.split('/').filter(unique)
	.reduce((acc, curr) => acc.concat({
		path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
		label: curr.charAt(0).toUpperCase() + curr.slice(1),
	}), []);

const updateLocation = (location, setState) => {
	location && setState((preState) => ({
		...preState,
		location,
	}));
};

const initialState = () => ({
	parentPath: '',
	options: {},
	location: [],
	button: 'dgsgsg',
});

const updateLoad = (onLoad, { state: { options, location }}) => {
	onLoad({
		options: keys(options).length
			? { '': options }
			: options,
		value: location,
	});
};

const Document = ({ children, onLoad = identity }) => {
	const { pathname } = useLocation();
	const [state, setState] = useState(initialState());

	const location = getCurrLocation(pathname);

	const value = useMemo(() => generateDataProcessor(state, setState));

	useEffect(() => {
		updateLocation(location, setState);
	}, [pathname]);

	useEffect(() => {
		updateLoad(onLoad, value);
	}, [value.state, pathname]);

	return <NavContext.Provider value={ value }>
		<Section { ...{ name: '', parentPath: '', location: location } }>
			{ children }
		</Section>
	</NavContext.Provider>;
};

export default Document;
