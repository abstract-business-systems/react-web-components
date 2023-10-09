import React from 'react';
import GlobalContext from '../Document/GlobalContext';
import { merge } from '@laufire/utils/collection';
import useBeforeLoad from '../hook/useBeforeLoad';
import listEntity from './listEntity';
import deleteEntity from './deleteEntity';

const getCreate = ({ base, entity, data, sendMessage, to }) => {
	const { id } = sendMessage({
		data: merge({ data }, { meta: { status: 'syncing' }}),
		path: `${ to }data/${ entity }/data/`,
		action: 'create',
		entity: 'state',
	});

	fetch(`${ base }/${ entity }`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	}).then((response) => response.json())
		.then((json) => sendMessage({
			data: { data: json, meta: { status: 'synced' }, id: id },
			path: `${ to }data/${ entity }/data/${ id }`,
			action: 'update', entity: 'state',
		}));
};

const getPatch = ({ base, entity, data, sendMessage, path }) => {
	sendMessage({
		data: merge(data, { meta: { status: 'syncing' }}),
		path: path,
		action: 'update',
		entity: 'state',
	});

	fetch(`${ base }/${ entity }/${ data.data.id }`, {
		method: 'PUT',
		body: JSON.stringify(data.data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	}).then((response) => response.json())
		.then((json) => sendMessage({
			data: merge({ data: json }, { meta: { status: 'updated' }}),
			path: path,
			action: 'update', entity: 'state',
		}));
};

const getActions = (args) => ({
	list: (props) => listEntity({ ...props, ...args }),
	create: (props) => getCreate({ ...props, ...args }),

	delete: (props) => deleteEntity({ ...props, ...args }),

	patch: (props) => getPatch({ ...props, ...args }),
});

const BaseComponent = (args) => {
	const { sendMessage, valuePath, name } = args;

	useBeforeLoad(() => {
		sendMessage({
			path: `${ valuePath }${ name }/`,
			entity: 'receiver',
			deferred: true,
			data: ({ action, ...rest }) =>
				getActions(args)[action]({ action, ...rest }),
		});

		sendMessage({
			path: `${ valuePath }${ name }/meta/`,
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
