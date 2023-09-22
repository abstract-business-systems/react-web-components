import React, { useEffect, useMemo, useState } from 'react';
import Section from '../Section';
import { useLocation, useNavigate } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import {
	keys,
	length,
	merge,
	reduce,
	result,
} from '@laufire/utils/collection';
import GlobalContext from './GlobalContext';
import { identity } from '@laufire/utils/fn';
import { parts, resolve } from '@laufire/utils/path';
import getId from '../common/helper/getId';
import transformOptions from '../common/helper/transformOptions';

const structurePath = '';
const valuePath = '/';

const genRemoveSection = (setState) => ({ data: { currPath, name }}) => {
	setState((pre) => {
		const option = result(pre.sections, (resolve(`${ currPath }../`) || '')
			.replaceAll('/', '/children/'));

		delete option[name];

		return merge({}, pre);
	});
};

const genAddSection = (setState) => ({ data }) => {
	setState((pre) => merge(
		{}, pre, data
	));
};

const getPathParentAndLeaf = (path) => {
	const partsArray = parts(path);
	const parent = resolve(...partsArray.slice(0, partsArray.length - 1));
	const leaf = partsArray[partsArray.length - 1];

	return { parent, leaf };
};

const genPatch = (setState) => ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	setState((preState) => {
		const value = result(preState, parent);

		value[leaf] = data;
		value.meta = meta;

		return { ...preState };
	});
};

const genUpdate = (setState) => ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	setState((preState) => {
		const value = result(preState, parent);

		value[leaf] = {
			...value[leaf],
			data: { ...value[leaf].data, ...data },
			meta: meta,
		};

		return { ...preState };
	});
};

const genList = (setState) => ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	setState((preState) => {
		const value = result(preState, parent);

		value[leaf] = reduce(
			data, (acc, curr) => {
				const id = getId();

				return {
					...acc, [id]: {
						id: id,
						data: curr,
						meta: meta,
					},
				};
			}, {}
		);

		return { ...preState };
	});
};

const genCreate = (setState) => ({ data, id, path, meta }) => {
	setState((preState) => {
		const value = result(preState, path);

		value[id] = { id, data, meta };

		return { ...preState };
	});
};

const genRemove = (setState) => ({ path, data }) => {
	setState((preState) => {
		delete result(preState, path)[data.id];

		return { ...preState };
	});
};

const generateActions = ({
	addSection, removeSection,
	patch, update, list, create, remove,
}) => ({
	addSection: addSection,
	removeSection: removeSection,
	patch: patch,
	update: update,
	list: list,
	create: create,
	delete: remove,
});

const generateReceivers = ({ actions, navigate }) => {
	const receivers = {
		'/': ({ entity, ...rest }) =>
			({
				receiver: ({ path, data }) => {
					receivers[path] = data;
				},
				section: ({ action, ...props }) =>
					actions[action]({ action, ...props }),
				state: ({ action, ...props }) =>
					actions[action]({ action, ...props }),
			})[entity]({ entity, ...rest }),
		'location': ({ data }) => {
			navigate(data);
		},
	};

	return receivers;
};

const generateSendMessage = (receivers) =>
	({ to = '/', ...rest }) => {
		const id = getId();

		receivers[to]({ to, ...rest, id });

		return { id };
	};

const getEntities = ({ setState, navigate }) => {
	const addSection = genAddSection(setState);
	const removeSection = genRemoveSection(setState);
	const patch = genPatch(setState);
	const update = genUpdate(setState);
	const list = genList(setState);
	const create = genCreate(setState);
	const remove = genRemove(setState);
	const actions = generateActions({
		addSection, removeSection,
		patch, update, list, create, remove,
	});
	const receivers = generateReceivers({ actions, navigate });

	return receivers;
};

const generateDataProcessor = ({ state, setState, entities }) => {
	const sendMessage = generateSendMessage(entities);

	return {
		state,
		structurePath,
		valuePath,
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
				label: label || curr,
			});
		}, []);

const updateLocation = (location, setState) => {
	location && setState((preState) => ({
		...preState,
		location,
	}));
};

const getInitialState = (initialState) => ({
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
	const navigate = useNavigate();

	const entities = useMemo(() => getEntities({ setState, navigate }), []) ;

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
