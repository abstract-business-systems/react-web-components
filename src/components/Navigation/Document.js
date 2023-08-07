import React, { useMemo } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { NavContext } from './NavContext';
import { merge } from '@laufire/utils/collection';

// eslint-disable-next-line max-lines-per-function
const Document = ({ children }) => {
	const { pathname } = useLocation();
	const currLocation = pathname.split('/').filter(unique)
		.reduce((acc, curr) => acc.concat({
			path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
			label: curr,
		}), []);

	const data = {
		parentPath: '',
		options: {},
		location: [],
	};

	const onLoad = (option) => {
		merge(data, option);
	};

	const value = useMemo(() => ({ onLoad, data }));

	return <NavContext.Provider value={ value }>
		<Section { ...{ name: '', location: currLocation, parentPath: '' } }>
			{ children }</Section>
	</NavContext.Provider>;
};

export default Document;
