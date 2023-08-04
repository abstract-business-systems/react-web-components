import React from 'react';
import Section from './Section';
import { useLocation } from 'react-router-dom';
import { unique } from '@laufire/utils/predicates';

const Document = ({ children, name = '' }) => {
	const { pathname } = useLocation();
	const location = pathname.split('/').filter(unique)
		.reduce((acc, curr) => acc.concat({
			path: `${ acc[acc.length - 1]?.path || '' }${ curr }/`,
			label: curr,
		}), []);

	return <Section { ...{ name, location } }>{ children }</Section>;
};

export default Document;
