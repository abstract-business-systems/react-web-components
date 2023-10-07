import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const genUpdate = ({ data, path }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		const value = result(preState, parent);

		merge(value[leaf], data);

		return { ...preState };
	};
};

const genList = ({ data, path }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		const value = result(preState, parent);

		value[leaf] = data;

		return { ...preState };
	};
};

const genCreate = ({ data, id, path }) =>
	(preState) => {
		const value = result(preState, path);

		value[id] = { id, ...data };

		return { ...preState };
	};

const genDelete = ({ path }) => {
	const { parent, leaf } = getPathParentAndLeaf(path);

	return (preState) => {
		delete result(preState, parent)[leaf];

		return { ...preState };
	};
};

const actions = {
	addSection: genAddSection,
	removeSection: genRemoveSection,
	patch: genPatch,
	update: genUpdate,
	list: genList,
	create: genCreate,
	delete: genDelete,
};

const generateReceivers = ({ navigate, setState, state, receivers }) => {
	merge(receivers, {
		'/': ({ entity, ...rest }) => ({
			receiver: ({ path, data }) => {
				receivers[path] = data;
			},

			section: ({ action, ...props }) =>
				setState(actions[action]({ action, ...props })),

			state: ({ action, deferred = false, ...props }) => {
				const fn = deferred
					? (cb) => { cb(state); }
					: setState;

				return fn(actions[action]({ action, ...props }));
			},
		})[entity]({ entity, ...rest }),

		'location': ({ data }) => {
			navigate(data);
		},
	});
};

const generateSendMessage = (receivers) =>
	({ to = '/', ...rest }) => {
		const id = getId();

		receivers[to]({ to, ...rest, id });

		return { id };
	};

const transforms = { not: (data) => !data };

const getContextValue = ({ state, setState, receivers }) => {
	const sendMessage = generateSendMessage(receivers);

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
	const { current: receivers } = useRef({});

	useMemo(() =>
		generateReceivers({ setState, state, navigate, receivers }), [state]) ;

	const value = useMemo(() =>
		getContextValue({ state, setState, receivers }));

	useUpdateLocation({ state, setState, pathname, value });

	useUpdateLoad({ onLoad, value, pathname });

	return <GlobalContext.Provider value={ value }>
		<Section { ...{ label } }>
			{ children }
		</Section>
	</GlobalContext.Provider>;
};

export default Document;
