import React, { useContext, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';

const ListItem = ({ children, id }) => {
	const context = useContext(GlobalContext);
	const { valuePath } = context;

	const contextValue = useMemo(() => ({
		...context,
		valuePath: resolve(valuePath, id),
	}));

	return <GlobalContext.Provider value={ contextValue }>
		{ children }
	</GlobalContext.Provider>;
};

export default ListItem;
