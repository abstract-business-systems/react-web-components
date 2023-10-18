import React, { useRef } from 'react';
import { map, omit } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import useBeforeLoad from '../hook/useBeforeLoad';
import listEntity from './listEntity';
import deleteEntity from './deleteEntity';
import createEntity from './createEntity';
import updateEntity from './updateEntity';

const getActions = (ref) => {
	const filteredRef = omit(ref, 'actions');

	return {
		...map(ref.current.actions || {}, (fn) => (props) =>
			fn({ ...props, ...filteredRef })),

		list: (props) => listEntity({ ...props, ...filteredRef }),

		create: (props) => createEntity({ ...props, ...filteredRef }),

		patch: (props) => updateEntity({ ...props, ...filteredRef }),

		delete: (props) => deleteEntity({ ...props, ...filteredRef }),
	};
};

const getReceiverData = (ref) => ({ action, ...rest }) => {
	const actions = getActions(ref);

	return actions[action]({ action, actions, ...rest });
};

const sendReceiverMessage = ({ sendMessage, valuePath, ref }) => {
	sendMessage({
		path: valuePath,
		entity: 'receiver',
		deferred: true,
		data: getReceiverData(ref),
	});
};

const BaseComponent = (args) => {
	const { sendMessage, valuePath } = args;
	const ref = useRef({});

	ref.current = args;

	useBeforeLoad(() => {
		sendReceiverMessage({ sendMessage, valuePath, ref });

		sendMessage({
			path: `${ valuePath }meta/`,
			entity: 'state',
			action: 'patch',
			deferred: true,
			data: {},
		});
	}, []);

	return null;
};

const RESTClient = (props) => <GlobalContext.Consumer>
	{ (context) =>
		<BaseComponent { ...{ ...context, ...props } }/> }
</GlobalContext.Consumer>;

export default RESTClient;
