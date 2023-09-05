import React, { useContext, useMemo } from 'react';
import GlobalContext from '../Document/GlobalContext';

const ListItem = ({ children, id }) => {
	const context = useContext(GlobalContext);

	const contextValue = useMemo(() => ({ ...context, id }));

	return <GlobalContext.Provider value={ contextValue }>
		{ children }
	</GlobalContext.Provider>;
};

export default ListItem;
