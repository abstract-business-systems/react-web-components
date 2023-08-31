import React, { useEffect, useMemo, useState } from 'react';
import Section from '../Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import {
	keys, length,
	merge, patch as patchFn, reduce, result,
} from '@laufire/utils/collection';
import GlobalContext from './GlobalContext';
import { identity } from '@laufire/utils/fn';
import { resolve } from '@laufire/utils/path';
import scaffold from '../Section/helper/scaffold';
import getId from '../common/helper/getId';

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

const parentPath = '';

const genPatch = (setState) => ({ data, id }) => {
	setState((preState) => ({
		...preState,
		...scaffold(id, data),
	}));
};

const genUpdate = (setState) => ({ data, id }) => {
	setState((preState) => ({
		...preState,
		...scaffold(id, data),
	}));
};

const genList = (setState) => ({ data: json, id }) => {
	setState((preState) => ({
		...preState,
		...scaffold(id, reduce(
			json.map((data) =>
				({ [getId()]: { data }})), (acc, curr) =>
				patchFn(acc, curr), {}
		)),
	}));
};

const genCreate = (setState) => ({ data, id }) => {
	setState((preState) => ({
		...preState,
		...scaffold(id, patchFn(result(preState, id), { [getId()]: { data }})),
	}));
};

const generateActions = ({
	addSection, removeSection,
	patch, update, list, create,
}) => ({
	addSection: addSection,
	delete: removeSection,
	patch: patch,
	update: update,
	list: list,
	create: create,
});

const generateReceivers = (actions) => {
	const receivers = {
		'/': ({ entity, ...rest }) =>
			({
				receiver: ({ id, data }) => {
					receivers[id] = data;
				},
				section: ({ action, ...props }) =>
					actions[action]({ action, ...props }),
				state: ({ action, ...props }) =>
					actions[action]({ action, ...props }),
			})[entity]({ entity, ...rest }),
	};

	return receivers;
};

const generateSendMessage = (receivers) =>
	({ to = '/', ...rest }) => {
		receivers[to]({ to, ...rest });
	};

const getEntities = (setState) => {
	const addSection = genAddSection(setState);
	const removeSection = genRemoveSection(setState);
	const patch = genPatch(setState);
	const update = genUpdate(setState);
	const list = genList(setState);
	const create = genCreate(setState);
	const actions = generateActions({
		addSection, removeSection,
		patch, update, list, create,
	});
	const receivers = generateReceivers(actions);

	return receivers;
};

const generateDataProcessor = ({ state, setState, entities }) => {
	const sendMessage = generateSendMessage(entities);

	return {
		state,
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
	button: 'hi',
	...initialState,
});

const updateLoad = (onLoad, { state: { sections, location }}) => {
	onLoad({
		options: transformOptions(sections),
		value: location,
	});
};

const useUpdateLocation = ({ state, setState, pathname, value }) => {
	const location = getCurrLocation({ pathname, state });

	useEffect(() => {
		updateLocation(location, setState);
	}, [pathname, length(keys(value.state.sections))]);
};

const useUpdateLoad = ({ onLoad, value, pathname }) => {
	useEffect(() => {
		updateLoad(onLoad, value);
	}, [value.state, pathname]);
};

const Document = ({
	children, onLoad = identity,
	label = 'Home', initialState,
}) => {
	const { pathname } = useLocation();
	const [state, setState] = useState(getInitialState(initialState));

	const entities = useMemo(() => getEntities(setState), []) ;

	const value = useMemo(() =>
		generateDataProcessor({ state, setState, entities }));

	useUpdateLocation({ state, setState, pathname, value });

	useUpdateLoad({ onLoad, value, pathname });

	return <GlobalContext.Provider value={ value }>
		<Section { ...{ label } }>
			{ children }
		</Section>
	</GlobalContext.Provider>;
};

export default Document;
