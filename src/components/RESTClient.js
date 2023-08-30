import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';
import getId from './common/helper/getId';

const getCreate = ({ base, entity, data, sendMessage, to }) => {
	fetch(`${ base }/${ entity }`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-type': 'application/json; charset=UTF-8' },
	})
		.then((response) => response.json())
		.then((json) => sendMessage({
			data: json,
			id: `${ to }data/${ entity }/data/`,
			action: 'update',
			entity: 'state',
		}));
};

const getList = ({ base, entity, sendMessage, to }) => {
	fetch(`${ base }/${ entity }`)
		.then((response) => response.json())
		.then((json) => {
			sendMessage({
				data: json.map((data) => ({ [getId()]: { data }})),
				id: `${ to }data/${ entity }/data/`,
				action: 'patch',
				entity: 'state',
			});
		});
};

const getActions = (args) => ({
	create: (props) => getCreate({ ...props, ...args }),

	delete: ({ data }) => ({ data: data, action: 'patch' }),

	list: (props) => getList({ ...props, ...args }),

	patch: ({ data }) => ({ data: data, action: 'patch' }),
});

const BaseComponent = (args) => {
	const { sendMessage, parentPath, name } = args;

	useEffect(() => {
		sendMessage({
			id: `${ parentPath }${ name }/`,
			entity: 'receiver',
			data: ({ action, ...rest }) =>
				getActions(args)[action]({ action, ...rest }),
		});
		sendMessage({
			id: `${ parentPath }${ name }/meta/`,
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
