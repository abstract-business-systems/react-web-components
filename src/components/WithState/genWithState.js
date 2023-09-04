import React, { useEffect } from 'react';
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

const onload = ({ props, sendMessage, path }) => {
	props.name && sendMessage({
		data: props.value,
		action: 'patch',
		path: path,
		entity: 'state',
	});
};

const genOnChange = ({ sendMessage, data, path }) => {
	sendMessage({
		data: data,
		action: 'patch',
		path: path,
		entity: 'state',
	});
};

const WithState = ({
	props, context, args: { Component },
	context: { sendMessage },
}) => {
	const { parentPath } = context;
	const path = `${ parentPath }${ props.name }`;

	useEffect(() => {
		onload({ props, sendMessage, path });
	}, []);

	const onChange = ({ data }) => {
		genOnChange({ sendMessage, data, path });
	};

	return (
		<Component { ...{
			onChange,
			...getProps({ props, context, path }),
		} }
		/>);
};

const genWithState = (args) =>
	// eslint-disable-next-line react/display-name
	({ ...props }) =>
		<GlobalContext.Consumer>
			{ (context) =>
				<WithState { ...{ context, args, props } }/> }
		</GlobalContext.Consumer>;

export default genWithState;
