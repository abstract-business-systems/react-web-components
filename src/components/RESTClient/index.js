import React from 'react';
import GlobalContext from '../Document/GlobalContext';
import { equals } from '@laufire/utils/collection';
import useBeforeLoad from '../hook/useBeforeLoad';

const status = 200;

const getCreate = ({ base, entity, data, sendMessage, to }) => {
	const { id } = sendMessage({
		data: data,
		path: `${ to }data/${ entity }/data/`,
		action: 'create',
		entity: 'state',
		meta: { status: 'syncing' },
	});

	fetch(`${ base }/${ entity }`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	}).then((response) => response.json())
		.then((json) => sendMessage({
			data: json,
			path: `${ to }data/${ entity }/data/${ id }`,
			action: 'update', entity: 'state',
			meta: { status: 'synced' },
		}));
};

const getList = ({ base, entity, sendMessage, to }) => {
	fetch(`${ base }/${ entity }`)
		.then((response) => response.json())
		.then((data) => {
			sendMessage({
				data: data,
				path: `${ to }data/${ entity }/data/`,
				action: 'list',
				entity: 'state',
				meta: { status: 'synced' },
			});
		});
};

const getPatch = ({ base, entity, data, sendMessage, path }) => {
	sendMessage({
		data: data,
		path: path,
		action: 'update',
		entity: 'state',
		meta: { status: 'syncing' },
	});

	fetch(`${ base }/${ entity }/${ data.data.id }`, {
		method: 'PATCH',
		body: JSON.stringify(data.data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	}).then((response) => response.json())
		.then((json) => sendMessage({
			data: json,
			path: path,
			action: 'update', entity: 'state',
			meta: { status: 'updated' },
		}));
};

const getDelete = ({ base, entity, data, sendMessage, path }) => {
	sendMessage({
		data: data,
		path: path,
		action: 'update',
		entity: 'state',
		meta: { status: 'deleting' },
	});

	fetch(`${ base }/${ entity }/${ data.data.id }`, { method: 'DELETE' })
		.then((response) => equals(response.status, status)
		&& sendMessage({
			data: data,
			path: path,
			action: 'delete',
			entity: 'state',
		}));
};

const getActions = (args) => ({
	create: (props) => getCreate({ ...props, ...args }),

	delete: (props) => getDelete({ ...props, ...args }),

	list: (props) => getList({ ...props, ...args }),

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
