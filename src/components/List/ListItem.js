import React, { useContext, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';

const ListItem = ({ children, id }) => {
	const context = useContext(GlobalContext);
	const { path } = context;

	const contextValue = useMemo(() => ({
		...context,
		path: resolve(path, id),
	}));

	return <GlobalContext.Provider value={ contextValue }>
		{ children }
	</GlobalContext.Provider>;
};

export default ListItem;
