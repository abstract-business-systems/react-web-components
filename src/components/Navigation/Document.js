import React, { useMemo } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { NavContext } from './NavContext';
import { merge } from '@laufire/utils/collection';

const data = {
	parentPath: '',
	options: {},
	locations: [],
};

const onLoad = (option) => {
	merge(data, option);
};

const Document = ({ children }) => {
	const { pathname } = useLocation();
	const currLocations = pathname.split('/').filter(unique)
		.reduce((acc, curr) => acc.concat({
			path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
			label: curr,
		}), []);

	const value = useMemo(() => ({ onLoad, data }));

	return <NavContext.Provider value={ value }>
		<Section { ...{ name: '', parentPath: '', locations: currLocations } }>
			{ children }</Section>
	</NavContext.Provider>;
};

export default Document;
