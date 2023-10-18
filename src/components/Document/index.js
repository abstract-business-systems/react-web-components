import React, { useEffect, useMemo, useRef, useState } from 'react';
import Section from '../Section';
import { useLocation, useNavigate } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import {
	clone,
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
import splitPath from '../common/helper/splitPath';
import getResolveProp from '../common/helper/getResolveProp';

const structurePath = '';
const valuePath = '/';
const receivers = {};

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

const ensureParent = ({ preState, parent: path }) => {
	const parent = parts(path)[1];
	const two = 2;
	const resolvedParentParts = resolve(...parts(path).slice(two));

	preState[parent] = scaffold(resolvedParentParts, {});

	return result(preState, path);
};

const genPatch = ({ data, path, meta }) => {
	const { parent, leaf } = splitPath(path);

	return (preState) => {
		const value = result(preState, parent)
			|| ensureParent({ preState, parent, leaf });

		value[leaf] = clone(data);
		value.meta = meta || value.meta;

		return { ...preState };
	};
};

const genUpdate = ({ data, path }) => {
	const { parent, leaf } = splitPath(path);
	const { parent: preParent, leaf: preLeaf } = splitPath(parent);

	return (preState) => {
		const value = result(preState, parent);

		merge(value[leaf], data);
		result(preState, preParent)[preLeaf] = { ...value };

		return { ...preState };
	};
};

const genList = ({ data, path }) => {
	const { parent, leaf } = splitPath(path);

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

		return merge({}, preState,);
	};

const genDelete = ({ path }) => {
	const { parent, leaf } = splitPath(path);

	return (preState) => {
		delete result(preState, parent)[leaf];

		return merge({}, preState,);
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

const rootEntities = (ref) => ({ entity, ...rest }) => ({
	receiver: ({ path, data }) => {
		receivers[path] = data;
	},
	section: ({ action, ...props }) =>
		ref.current.setState(actions[action]({ action, ...props })),

	state: ({ action, deferred = false, ...props }) => {
		const { state, setState } = ref.current;

		const fn = deferred
			? (cb) => { cb(state); }
			: setState;

		return fn(actions[action]({ action, ...props }));
	},
})[entity]({ entity, ...rest });

const generateReceivers = ({ navigate, ref }) => {
	merge(receivers, {
		'/': rootEntities(ref),

		'location': ({ data }) => {
			navigate(data);
		},
	});
};

const generateSendMessage = ({ ref }) =>
	({ to = '/', ...rest }) => {
		const id = getId();
		const data = getResolveProp({
			prop: rest.data, state: ref.current.state,
			path: rest.currPath,
		});

		receivers[to]({ to, ...rest, id, data });

		return { id };
	};

const transforms = { not: (data) => !data };

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

const updateLoad = (onLoad, { sections, location }) => {
	onLoad({
		options: transformOptions(sections),
		value: location,
	});
};

const useUpdateLocation = ({ state, setState, pathname }) => {
	const location = getCurrLocation({ pathname, state });

	useEffect(() => {
		updateLocation(location, setState);
	}, [pathname, length(keys(state.sections))]);
};

const useUpdateLoad = ({ onLoad, state, pathname }) => {
	useEffect(() => {
		updateLoad(onLoad, state);
	}, [state, pathname]);
};

const getContext = (sendMessage, state) => ({
	sendMessage,
	state,
	structurePath,
	valuePath,
	transforms,
});

const Document = ({
	children, onLoad = identity,
	label = 'Home', initialState,
}) => {
	const { pathname } = useLocation();
	const [state, setState] = useState(getInitialState(initialState));
	const navigate = useNavigate();
	const ref = useRef({});

	ref.current = { state, setState };

	useMemo(() => generateReceivers({ ref, navigate }), []);

	const sendMessage = useMemo(() => generateSendMessage({ ref }), []);

	useUpdateLocation({ state, setState, pathname });

	useUpdateLoad({ onLoad, state, pathname });

	return <GlobalContext.Provider value={ getContext(sendMessage, state) }>
		<Section { ...{ label } }>
			{ children }
		</Section>
	</GlobalContext.Provider>;
};

export default Document;
