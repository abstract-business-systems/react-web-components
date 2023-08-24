import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';

const getActions = ({ sendMessage, base, name }) => ({
	create: ({ data }) => ({ data: data, action: 'patch' }),

	delete: ({ data }) => ({ data: data, action: 'patch' }),

	list: ({ to }) => {
		const data = `${ base }/${ name }`;

		sendMessage({
			data: { [to]: data }, action: 'patch',
			entity: 'state',
		});
	},

	patch: ({ data }) => ({ data: data, action: 'patch' }),
});

const SendMessage = (args) => {
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
		<SendMessage { ...{ ...context, ...props } }/> }
</GlobalContext.Consumer>;

export default RESTClient;
