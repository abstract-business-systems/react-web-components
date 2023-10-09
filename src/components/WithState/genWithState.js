import React, { useMemo } from 'react';
import { equals, map, omit, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType, resolve } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';
import { defined } from '@laufire/utils/fn';
import useBeforeLoad from '../hook/useBeforeLoad';
import { isDefined } from '@laufire/utils/reflection';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProps = ({
	props: { name, ...props }, path,
	context: { state, valuePath },
}) => {
	const value = isDefined(name && result(state, path))
		? result(state, path)
		: props.value;

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
		deferred: true,
	});

	onLoad && onLoad.forEach((load) => {
		sendMessage({
			data: props.value,
			action: 'patch',
			path: path,
			entity: 'state',
			deferred: true,
			...load,
		});
	});
};

const genOnTrigger = ({
	sendMessage, path, onChange = {},
	onClick: {
		action = 'patch',
		to, entity = 'state', ...onClick
	},
}) => ({ data }) => {
	sendMessage({ data, action, path, entity, to, ...onClick, ...onChange });
};

const contextValue = ({ context, path }) =>
	({ ...context, valuePath: path });

const getResolvePath = ({ name, value }) =>
	defined(name, isPath(value) && value) || '';

const useTrigger = (props) =>
	useMemo(() => genOnTrigger(props), []);

const WithState = ({
	props: { onClick = {}, onLoad, onChange, ...props },
	context, args: { Component, trigger = 'onChange' },
}) => {
	const { valuePath, sendMessage } = context;
	const path = resolve(valuePath, getResolvePath(props));

	useBeforeLoad(() => {
		handelOnLoad({ props, sendMessage, path, onLoad });
	}, []);
	const onTrigger = useTrigger({ sendMessage, path, onClick, onChange });

	return (
		<GlobalContext.Provider value={ contextValue({ context, path }) }>
			<Component { ...{
				[trigger]: onTrigger,
				...getProps({ props, context, path }),
			} }
			/>
		</GlobalContext.Provider>
	);
};

const genWithState = (args) => {
	const WrappedComponent = (props) =>
		<GlobalContext.Consumer>
			{ (context) => <WithState { ...{ context, args, props } }/> }
		</GlobalContext.Consumer>;

	WrappedComponent.displayName = 'GeneratedWithState';

	return WrappedComponent;
};

export default genWithState;
