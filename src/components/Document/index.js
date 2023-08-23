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

const genRemoveSection = (setState) => ({ data: { currPath, name }}) => {
	setState((pre) => {
		const option = result(pre.sections, (resolve(`${ currPath }../`)
					|| '').replaceAll('/', '/children/'));

		delete option[name];

		return merge({}, pre);
	});
};

const genAddSection = (setState) => ({ data }) => {
	setState((pre) => merge(
		{}, pre, data
	));
};

const genPatch = (setState) => (evt) => {
	map(evt, (value, key) => {
		setState((pre) => ({ ...pre, [key]: value }));
	});
};

const parentPath = '';

const generateActions = ({ addSection, removeSection }) => ({
	create: addSection,
	delete: removeSection,
	patch: addSection,
});

const generateReceivers = (actions) =>
	({ '/': ({ data, action }) => actions[action]({ data }) });

const generateEntities = (receivers) => ({
	receiver: ({ id, data }) => {
		receivers[id] = data;
	},
	section: ({ to, ...rest }) => receivers[to]({ to, ...rest }),
	state: ({ to, ...rest }) => receivers[to]({ to, ...rest }),
});

const generateSendMessage = (entities) => ({ to = '/', entity, ...rest }) => {
	entities[entity]({ to, ...rest });
};

const generateDataProcessor = (state, setState) => {
	const addSection = genAddSection(setState);
	const removeSection = genRemoveSection(setState);
	const path = genPatch(setState);

	const actions = generateActions({ addSection, removeSection });
	const receivers = generateReceivers(actions);
	const entities = generateEntities(receivers);
	const sendMessage = generateSendMessage(entities);

	return {
		state,
		path,
		parentPath,
		setState,
		sendMessage,
	};
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
