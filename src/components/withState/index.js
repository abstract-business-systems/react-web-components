import React from 'react';
import scaffold from '../Section/helper/scaffold';
import { map, merge, result } from '@laufire/utils/collection';
import GlobalContext from '../Document/GlobalContext';

const isPath = (prop) => prop.includes('/');

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
