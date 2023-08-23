import React, { useEffect } from 'react';
import GlobalContext from './Document/GlobalContext';

const actions = {
	create: ({ data }) => ({ data: data, action: 'patch' }),

	delete: ({ data }) => ({ data: data, action: 'patch' }),

	list: ({ data }) => ({ data: data, action: 'patch' }),

	patch: ({ data }) => ({ data: data, action: 'patch' }),
};

const SendMessage = ({ sendMessage, parentPath, name }) => {
	useEffect(() => {
		sendMessage({
			id: `${ parentPath }${ name }/`,
			entity: 'receiver',
			data: ({ data, action }) => actions[action]({ data }),
		});
	}, []);

	return null;
};

const RESTClient = (props) => <GlobalContext.Consumer>
	{ (context) =>
		<SendMessage
			{ ...{ ...context, ...props } }
		/> }
</GlobalContext.Consumer>;

export default RESTClient;
