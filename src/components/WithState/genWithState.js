import React, { useMemo } from 'react';
import { equals, map, omit, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType, resolve } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';
import { defined } from '@laufire/utils/fn';
import useBeforeLoad from '../hook/useBeforeLoad';
import { isDefined } from '@laufire/utils/reflection';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProp = ({ prop, state, valuePath }) => (isPath(prop)
	? result(state, resolve(valuePath, prop))
	: prop);

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
			(prop) => getProp({ prop, state, valuePath })),
	};
};

const processSendMessage = ({
	events, data: currData, context: { sendMessage },
	path: currPath, deferred = false, context,
}) => {
	const action = 'patch';
	const entity = 'state';

	const data = getProp({ prop: currData, ...context });

	[].concat(events).forEach((event) => {
		const path = event.path ? resolve(currData, event.path) : currPath;
		const eventData = isDefined(event.data)
		&& { data: getProp({ prop: event.data, ...context }) };

		sendMessage({
			data, action, path, entity, deferred, ...event,
			...eventData,
		});
	});
};

const handelOnLoad = ({
	props: { name, value: data }, path,
	onLoad, context,
}) => {
	const props = { path, context, data };

	name && processSendMessage({
		...props,
		deferred: true,
		events: { },
	});

	onLoad && processSendMessage({ ...props, events: onLoad, deferred: true });
};

const genOnTrigger = ({ path, onChange, onClick, trigger, ...rest }) =>
	({ data }) => {
		const props = { ...rest, path, data };
		const events = { onChange, onClick };

		processSendMessage({ ...props, events: events[trigger] });
	};

const contextValue = ({ context, path }) =>
	({ ...context, valuePath: path });

const getResolvePath = ({ name, value }) =>
	defined(name, isPath(value) && value) || '';

const useTrigger = (props) => {
	const dependency = defined(
		props.onClick?.data, props.onChange?.data, ''
	);

	return useMemo(() => genOnTrigger(props), [dependency]);
};

const WithState = ({
	props: { onClick = {}, onLoad, onChange = {}, ...props },
	context, args: { Component, trigger = 'onChange' },
}) => {
	const { valuePath } = context;
	const path = resolve(valuePath, getResolvePath(props));

	useBeforeLoad(() => {
		handelOnLoad({ context, props, path, onLoad });
	}, []);

	const onTrigger = useTrigger({ context, path, onClick, onChange, trigger });

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
