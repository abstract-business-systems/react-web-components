import React, { useRef } from 'react';
import { map, omit } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import useBeforeLoad from '../hook/useBeforeLoad';
import listEntity from './listEntity';
import deleteEntity from './deleteEntity';
import createEntity from './createEntity';
import updateEntity from './updateEntity';

const getActions = (args) => {
	const filteredArgs = omit(args, 'actions');

	return {
		...map(args.current.actions || {}, (fn) => (props) =>
			fn({ ...props, ...filteredArgs })),

		list: (props) => listEntity({ ...props, ...filteredArgs }),

		create: (props) => createEntity({ ...props, ...filteredArgs }),

		patch: (props) => updateEntity({ ...props, ...filteredArgs }),

		delete: (props) => deleteEntity({ ...props, ...filteredArgs }),
	};
};

const getReceiverData = (args) => ({ action, ...rest }) => {
	const actions = getActions(args);

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
