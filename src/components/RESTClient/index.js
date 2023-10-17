import React from 'react';
import { map } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import useBeforeLoad from '../hook/useBeforeLoad';
import listEntity from './listEntity';
import deleteEntity from './deleteEntity';
import createEntity from './createEntity';
import updateEntity from './updateEntity';

const getActions = ({ actions = {}, ...args }) => ({
	...map(actions, (fn) => (props) => fn({ ...props, ...args })),

	list: (props) => listEntity({ ...props, ...args }),

	create: (props) => createEntity({ ...props, ...args }),

	patch: (props) => updateEntity({ ...props, ...args }),

	delete: (props) => deleteEntity({ ...props, ...args }),
});

const getReceiverData = (args) => ({ action, ...rest }) => {
	const actions = getActions(args);

	return actions[action]({ action, actions, ...rest });
};

const BaseComponent = (args) => {
	const { sendMessage, valuePath } = args;

	useBeforeLoad(() => {
		sendMessage({
			path: `${ valuePath }`,
			entity: 'receiver',
			deferred: true,
			data: getReceiverData(args),
		});

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
