import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';
import getId from './common/helper/getId';

const getActions = ({ sendMessage, base }) => ({
	create: ({ data }) => ({ data: data, action: 'patch' }),

	delete: ({ data }) => ({ data: data, action: 'patch' }),

	list: ({ to, entity }) => {
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
	},

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
