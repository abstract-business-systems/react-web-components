import React from 'react';
import GlobalContext from '../Document/GlobalContext';
import { result } from '@laufire/utils/collection';
import { resolve } from '@laufire/utils/path';
import { defined } from '@laufire/utils/fn';

const genWithContext = ({ Component }) => {
	const WrappedComponent = ({ ...props }) =>
		<GlobalContext.Consumer>
			{ (context) => {
				const value = result(context.state,
					resolve(context.valuePath, defined(props.value, '')));

				return (
					<Component { ...{ ...props, value } }/>
				);
			} }
		</GlobalContext.Consumer>;

	WrappedComponent.displayName = 'GeneratedWithContext';

	return WrappedComponent;
};

export default genWithContext;
