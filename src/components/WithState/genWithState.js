import React from 'react';
import { equals, map, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProps = ({ props, state }) => map(props, (prop) =>
	(isPath(prop) ? result(state, prop) : prop));

// eslint-disable-next-line react/display-name
const genWithState = (Component) => ({ action = 'patch', ...props }) =>
	<GlobalContext.Consumer>
		{ ({ state, sendMessage }) => {
			const onChange = ({ data }) => {
				sendMessage({
					data: data,
					action: action,
					id: props.value,
					entity: 'state',
				});
			};

			return (
				<Component { ...{
					onChange,
					...getProps({ props, state }),
				} }
				/>);
		} }
	</GlobalContext.Consumer>;

export default genWithState;
