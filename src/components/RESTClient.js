import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';

const getActions = ({ sendMessage, base }) => ({
	create: ({ data }) => ({ data: data, action: 'patch' }),

	delete: ({ data }) => ({ data: data, action: 'patch' }),

	list: ({ to, entity }) => {
		fetch(`${ base }/${ entity }`)
			.then((response) => response.json())
			.then((data) => {
				sendMessage({
					data: { [to]: data },
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
	}, []);

	return null;
};

const RESTClient = (props) => <GlobalContext.Consumer>
	{ (context) =>
		<BaseComponent { ...{ ...context, ...props } }/> }
</GlobalContext.Consumer>;

export default RESTClient;
