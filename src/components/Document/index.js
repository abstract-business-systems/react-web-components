import React, { useEffect, useMemo, useState } from 'react';
import Section from '../Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import {
	keys, length, map,
	merge, reduce, result,
} from '@laufire/utils/collection';
import GlobalContext from './GlobalContext';
import { identity } from '@laufire/utils/fn';
import { resolve } from '@laufire/utils/path';

const transformOptions = (sections) => (keys(sections).length
	? { '': sections }
	: sections);

const generateUnLoad = (setState) => ({ currPath, name }) => {
	setState((pre) => {
		const option = result(pre.sections, (resolve(`${ currPath }../`)
					|| '').replaceAll('/', '/children/'));

		delete option[name];

		return merge(
			{}, pre, option
		);
	});
};

const generateDataProcessor = (state, setState) => {
	const onLoad = ({ option }) => {
		setState((pre) => merge(
			{}, pre, option
		),);
	};
	const unLoad = generateUnLoad(setState);

	const patch = (evt) => {
		map(evt, (value, key) => {
			setState((pre) => ({ ...pre, [key]: value }));
		});
	};
	const parentPath = '';

	return { onLoad, state, patch, unLoad, parentPath, setState };
};

const getLabel = (data, path) => reduce(
	data, (acc, route) =>
		acc || (route.name === path
			? route
			: route.children && getLabel(route.children, path)), false
);

const getCurrLocation = ({ state: { sections }, pathname }) =>
	pathname.split('/').filter(unique)
		.reduce((acc, curr) => {
			const { label } = getLabel(transformOptions(sections), curr);

			return acc.concat({
				name: curr,
				value: `${ acc[acc.length - 1]?.value || '' }${ curr }/`,
				label: label,
			});
		}, []);

const updateLocation = (location, setState) => {
	location && setState((preState) => ({
		...preState,
		location,
	}));
};

const getInitialState = (initialState) => ({
	parentPath: '',
	sections: {},
	location: [],
	button: 'dgsgsg',
	...initialState,
});

const updateLoad = (onLoad, { state: { sections, location }}) => {
	onLoad({
		options: transformOptions(sections),
		value: location,
	});
};

const Document = ({
	children, onLoad = identity, label = 'Home',
	initialState,
}) => {
	const { pathname } = useLocation();
	const [state, setState] = useState(getInitialState(initialState));

	const location = getCurrLocation({ pathname, state });
	const value = useMemo(() => generateDataProcessor(state, setState));

	useEffect(() => {
		updateLocation(location, setState);
	}, [pathname, length(keys(value.state.sections))]);

	useEffect(() => {
		updateLoad(onLoad, value);
	}, [value.state, pathname]);

	return <GlobalContext.Provider value={ value }>
		<Section { ...{ label } }>
			{ children }
		</Section>
	</GlobalContext.Provider>;
};

export default Document;
