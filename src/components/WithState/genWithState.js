import React, { useEffect, useMemo } from 'react';
import { equals, map, omit, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProps = ({ props: { name, ...props }, path, context: { state }}) => {
	const value = (name && result(state, path)) || props.value;

	return {
		value,
		...map(omit(props, [name && 'value']),
			(prop) => (isPath(prop) ? result(state, prop) : prop)),
	};
};

const handelOnLoad = ({ props, sendMessage, path, source }) => {
	(props.name || source) && sendMessage({
		data: props.value,
		action: 'patch',
		path: path,
		entity: 'state',
		...source,
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

const WithState = ({
	props: { onClick = {}, onLoad: source, ...props },
	context, args: { Component, trigger = 'onChange' },
}) => {
	const { parentPath, sendMessage } = context;
	const path = `${ parentPath }${ props.name }`;

	useEffect(() => {
		handelOnLoad({ props, sendMessage, path, source });
	}, []);

	return (
		<GlobalContext.Provider value={ useMemo(() => ({ ...context, path })) }>
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
