import React from 'react';
import scaffold from '../Section/helper/scaffold';
import { equals, map, merge, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';
import { pathType } from '@laufire/utils/path';
import { falsy } from '@laufire/utils/predicates';

const isPath = (prop) => falsy(equals(pathType(prop), 'lax'));

const getProps = ({ props, state }) => map(props, (prop) =>
	(isPath(prop) ? result(state, prop) : prop));

// eslint-disable-next-line react/display-name
const withState = (Component) => ({ ...props }) =>
	<GlobalContext.Consumer>
		{ ({ state, setState }) => {
			const onChange = ({ data }) => {
				setState((pre) => merge(
					{}, pre, scaffold(props.value, data)
				));
			};

			return (
				<Component { ...{
					onChange,
					...getProps({ props, state }),
				} }
				/>);
		} }
	</GlobalContext.Consumer>;

export default withState;
