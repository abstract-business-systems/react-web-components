import React, { useEffect } from 'react';
import { equals, map, omit, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType, resolve } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProps = ({
	props: { name, ...props }, path,
	context: { state, valuePath },
}) => {
	const value = (name && result(state, path)) || props.value;

	return {
		value,
		...map(omit(props, [name && 'value']),
			(prop) => (isPath(prop)
				? result(state, resolve(valuePath, prop))
				: prop)),
	};
};

const handelOnLoad = ({ props, sendMessage, path, onLoad }) => {
	props.name && sendMessage({
		data: props.value,
		action: 'patch',
		path: path,
		entity: 'state',
	});

	onLoad && onLoad.forEach((load) => {
		sendMessage({
			data: props.value,
			action: 'patch',
			path: path,
			entity: 'state',
			...load,
		});
	});
};

const onTrigger = ({
	sendMessage, path,
	onClick: {
		action = 'patch',
		to, entity = 'state', ...onClick
	},
}) => ({ data }) => {
	sendMessage({ data, action, path, entity, to, ...onClick });
};

const contextValue = ({ context, path }) =>
	({ ...context, valuePath: path });

const WithState = ({
	props: { onClick = {}, onLoad, ...props },
	context, args: { Component, trigger = 'onChange' },
}) => {
	const { valuePath, sendMessage } = context;
	const path = resolve(valuePath, props.name || props.value || '');

	useEffect(() => {
		handelOnLoad({ props, sendMessage, path, onLoad });
	}, []);

	return (
		<GlobalContext.Provider value={ contextValue({ context, path }) }>
			<Component { ...{
				[trigger]: onTrigger({ sendMessage, path, onClick }),
				...getProps({ props, context, path }),
			} }
			/>
		</GlobalContext.Provider>
	);
};

const genWithState = (args) =>
	// eslint-disable-next-line react/display-name
	(props) =>
		<GlobalContext.Consumer>
			{ (context) => <WithState { ...{ context, args, props } }/> }
		</GlobalContext.Consumer>;

export default genWithState;
