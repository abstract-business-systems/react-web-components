import React, { useContext, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';
import { resolve } from '@laufire/utils/path';

const ListItem = ({ children, id }) => {
	const context = useContext(GlobalContext);

	const contextValue = useMemo(() => ({
		...context,
		path: resolve(context.path, id),
	}));

	return <GlobalContext.Provider value={ contextValue }>
		{ children }
	</GlobalContext.Provider>;
};

export default ListItem;
