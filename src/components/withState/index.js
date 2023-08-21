import React from 'react';
import scaffold from '../Section/helper/scaffold';
import { merge, result } from '@laufire/utils/collection';

import GlobalContext from '../Document/GlobalContext';

// eslint-disable-next-line react/display-name
const withState = (Component) => ({ value, ...props }) =>
	<GlobalContext.Consumer>
		{ ({ state, setState }) => {
			const onChange = ({ data }) => {
				setState((pre) => merge(
					{}, pre, scaffold(value, data)
				));
			};

			return (
				<Component { ...{
					onChange: onChange,
					value: result(state, value),
					...props,
				} }
				/>);
		} }
	</GlobalContext.Consumer>;

export default withState;
