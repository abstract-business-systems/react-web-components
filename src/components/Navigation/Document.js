import React, { useContext, useEffect, useMemo } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { merge } from '@laufire/utils/collection';
import { NavContext } from './NavContext';

const generateDataProcessor = () => {
	const data = {
		parentPath: '',
		options: {},
		location: [],
	};
	const onLoad = ({ option, location }) => {
		merge(data, option);
		data.location = location;
	};

	return { onLoad, data };
};

const getCurrLocation = (pathname) => pathname.split('/').filter(unique)
	.reduce((acc, curr) => acc.concat({
		path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
		label: curr.charAt(0).toUpperCase() + curr.slice(1),
	}), []);

const Document = ({ children, onLoad }) => {
	const { pathname } = useLocation();
	const location = getCurrLocation(pathname);

	const value = useMemo(() => generateDataProcessor());
	const { data: { options }} = useContext(NavContext);

	useEffect(() => {
		onLoad({
			options: { '': value.data.options },
			value: location,
		});
	}, [options, pathname]);

	return <NavContext.Provider value={ value }>
		<Section { ...{ name: '', parentPath: '', location: location } }>
			{ children }
		</Section>
	</NavContext.Provider>;
};

export default Document;
