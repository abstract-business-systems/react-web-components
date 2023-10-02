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
import scaffold from '../Section/helper/scaffold';

const structurePath = '';
const valuePath = '/';

const genRemoveSection = ({ data: { currPath, name }}) =>
	(preState) => {
		const option = result(preState.sections, (resolve(`${ currPath }../`) || '')
			.replaceAll('/', '/children/'));

		delete option[name];

		return merge({}, preState);
	};

const genAddSection = ({ data }) =>
	(preState) => merge(
		{}, preState, data
	);

const getPathParentAndLeaf = (path) => {
	const partsArray = parts(path);
	const parent = resolve(...partsArray.slice(0, partsArray.length - 1));
	const leaf = partsArray[partsArray.length - 1];

	return { parent, leaf };
};

const ensureParent = ({ preState, parent: path }) => {
	const parent = parts(path)[1];
	const two = 2;
	const resolvedParentParts = resolve(...parts(path).slice(two));

	preState[parent] = scaffold(resolvedParentParts, {});

	return result(preState, path);
};

const genPatch = ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		const value = result(preState, parent)
			|| ensureParent({ preState, parent, leaf });

		value[leaf] = data;
		value.meta = meta || value.meta;

		return { ...preState };
	};
};

const genUpdate = ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		const value = result(preState, parent);

		value[leaf] = {
			...value[leaf],
			data: { ...value[leaf].data, ...data },
			meta: meta,
		};

		return { ...preState };
	};
};

const genList = ({ data, path, meta }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
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
	};
};

const genCreate = ({ data, id, path, meta }) =>
	(preState) => {
		const value = result(preState, path);

		value[id] = { id, data, meta };

		return { ...preState };
	};

const genDelete = ({ path }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		delete result(preState, parent)[leaf];

		return { ...preState };
	};
};

const generateReceivers = ({ actions, navigate, setState }) => {
	const receivers = {
		'/': ({ entity, ...rest }) => ({
			receiver: ({ path, data }) => {
				receivers[path] = data;
			},

			section: ({ action, ...props }) =>
				setState(actions[action]({ action, ...props })),

			state: ({ action, ...props }) =>
				setState(actions[action]({ action, ...props })),
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
	const actions = {
		addSection: genAddSection,
		removeSection: genRemoveSection,
		patch: genPatch,
		update: genUpdate,
		list: genList,
		create: genCreate,
		delete: genDelete,
	};
	const receivers = generateReceivers({ actions, navigate, setState });

	return receivers;
};

const transforms = { not: (data) => !data };

const generateDataProcessor = ({ state, setState, entities }) => {
	const sendMessage = generateSendMessage(entities);

	return {
		state,
		structurePath,
		valuePath,
		setState,
		transforms,
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
