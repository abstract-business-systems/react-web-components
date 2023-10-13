import React, { useMemo } from 'react';
import { map, omit, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';
import { defined } from '@laufire/utils/fn';
import useBeforeLoad from '../hook/useBeforeLoad';
import { isDefined } from '@laufire/utils/reflection';
import isPath from '../common/helper/isPath';
import getResolveProp from '../common/helper/getResolveProp';

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
			(prop) => getResolveProp({
				prop: prop, state: state,
				path: valuePath,
			})),
	};
};

const processSendMessage = ({
	events, data, context: { sendMessage },
	path: currPath, deferred = false,
}) => {
	const action = 'patch';
	const entity = 'state';

	[].concat(events).forEach((event) => {
		const path = event.path ? resolve(currPath, event.path) : currPath;
		const eventData = isDefined(event.data) && { data: event.data };

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

const useTrigger = (props) => useMemo(() =>
	genOnTrigger(props), [props.context.sendMessage]);

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
