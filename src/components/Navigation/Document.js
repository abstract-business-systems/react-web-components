import React, { useEffect, useMemo, useState } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { keys, length, map, merge, reduce } from '@laufire/utils/collection';
import { NavContext } from './NavContext';
import { identity } from '@laufire/utils/fn';

const transformOptions = (options) => (keys(options).length
	? { '': options }
	: options);

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

const getLabel = (data, path) => reduce(
	data, (acc, route) =>
		acc || (route.name === path
			? route
			: route.children && getLabel(route.children, path)), false
);

const getCurrLocation = ({ state: { options }, pathname }) =>
	pathname.split('/').filter(unique)
		.reduce((acc, curr) => {
			const { label } = getLabel(transformOptions(options), curr);

			return acc.concat({
				name: curr,
				path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
				label: label,
			});
		}, []);

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
		options: transformOptions(options),
		value: location,
	});
};

const Document = ({ children, onLoad = identity, label = 'Home' }) => {
	const { pathname } = useLocation();
	const [state, setState] = useState(initialState());

	const location = getCurrLocation({ pathname, state });
	const value = useMemo(() => generateDataProcessor(state, setState));

	useEffect(() => {
		updateLocation(location, setState);
	}, [pathname, length(keys(value.state.options))]);

	useEffect(() => {
		updateLoad(onLoad, value);
	}, [value.state, pathname]);

	return <NavContext.Provider value={ value }>
		<Section { ...{ label } }>
			{ children }
		</Section>
	</NavContext.Provider>;
};

export default Document;
