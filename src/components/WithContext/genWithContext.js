import React from 'react';
import GlobalContext from '../Document/GlobalContext';
import { result } from '@laufire/utils/collection';
import { resolve } from '@laufire/utils/path';

// eslint-disable-next-line react/display-name
const genWithContext = ({ Component }) => ({ ...props }) =>
	<GlobalContext.Consumer>
		{ (context) => {
			const value = result(context.state,
				resolve(context.valuePath, props.value || ''));

			return (
				<Component { ...{ ...props, value } }/>
			);
		} }
	</GlobalContext.Consumer>;

export default genWithContext;
