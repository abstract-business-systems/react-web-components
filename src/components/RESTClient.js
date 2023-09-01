import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';

const getCreate = ({ base, entity, data, sendMessage, to }) => {
	const { id } = sendMessage({
		data: data,
		path: `${ to }data/${ entity }/data/`,
		action: 'create',
		entity: 'state',
	});

	fetch(`${ base }/${ entity }`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})
		.then((response) => response.json())
		.then((json) => sendMessage({
			data: json,
			path: `${ to }data/${ entity }/data/${ id }`,
			action: 'update',
			entity: 'state',
		}));
};

const getList = ({ base, entity, sendMessage, to }) => {
	fetch(`${ base }/${ entity }?userId=1`)
		.then((response) => response.json())
		.then((data) => {
			sendMessage({
				data: data,
				path: `${ to }data/${ entity }/data/`,
				action: 'list',
				entity: 'state',
			});
		});
};

const getDelete = () => {

};

const getActions = (args) => ({
	create: (props) => getCreate({ ...props, ...args }),

	delete: (props) => getDelete(props),

	list: (props) => getList({ ...props, ...args }),

	patch: ({ data }) => ({ data: data, action: 'patch' }),
});

const BaseComponent = (args) => {
	const { sendMessage, parentPath, name } = args;

	useEffect(() => {
		sendMessage({
			path: `${ parentPath }${ name }/`,
			entity: 'receiver',
			data: ({ action, ...rest }) =>
				getActions(args)[action]({ action, ...rest }),
		});
		sendMessage({
			path: `${ parentPath }${ name }/meta/`,
			entity: 'state',
			action: 'patch',
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
