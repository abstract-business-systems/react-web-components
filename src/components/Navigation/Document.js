import React, { useContext, useEffect, useMemo } from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';
import { merge } from '@laufire/utils/collection';
import { NavContext } from './NavContext';

const data = {
	parentPath: '',
	options: {},
	locations: [],
};

const onLoad = ({ option, locations }) => {
	merge(data, option);
	data.locations = locations;
};
const getCurrLocations = (pathname) => pathname.split('/').filter(unique)
	.reduce((acc, curr) => acc.concat({
		path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
		label: curr.charAt(0).toUpperCase() + curr.slice(1),
	}), []);

const Document = ({ children, onChange }) => {
	const { pathname } = useLocation();
	const currLocations = getCurrLocations(pathname);

	const value = useMemo(() => ({ onLoad, data }));
	const { data: { options, locations }} = useContext(NavContext);

	useEffect(() => {
		onChange({
			options: { '': value.data.options },
			value: currLocations,
		});
	}, [options, locations, pathname]);

	return <NavContext.Provider value={ value }>
		<Section { ...{ name: '', parentPath: '', locations: currLocations } }>
			{ children }
		</Section>
	</NavContext.Provider>;
};

export default Document;
