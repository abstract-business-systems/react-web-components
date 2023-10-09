import React from 'react';
import GlobalContext from '../Document/GlobalContext';
import { equals, merge, reduce } from '@laufire/utils/collection';
import useBeforeLoad from '../hook/useBeforeLoad';
import getId from '../common/helper/getId';

const status = 200;

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

const listData = (data) =>
	reduce(
		data, (acc, curr) => {
			const id = getId();

			return {
				...acc, [id]: {
					id: id,
					data: curr,
					meta: { status: 'synced' },
				},
			};
		}, {}
	);

const getList = ({ base, entity, sendMessage, path }) => {
	fetch(`${ base }/${ entity }`)
		.then((response) => response.json())
		.then((data) => {
			sendMessage({
				data: listData(data),
				path: path,
				action: 'list',
				entity: 'state',
			});
		});
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

const getDelete = ({ base, entity, data, sendMessage, path }) => {
	sendMessage({
		data: merge(data, { meta: { status: 'deleting' }}),
		path: path,
		action: 'update',
		entity: 'state',
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
