import { map, reduce, values } from '@laufire/utils/collection';
import React, { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import Sections from '../Sections';
import { identity } from '@laufire/utils/fn';
import buildEvent from '../helper/buildEvent';

const getRoutes = (routes) =>
	values(map(routes, (data) => ({
		path: data.name,
		element: <Sections { ...data }/>,
		...data.children && { children: getRoutes(data.children) },
	})));

const updatePaths = (data, path = '') => reduce(
	data,
	(
		acc, curValue, key
	) => {
		const updatedPath = `${ path }${ key }/`;
		const updatedValue = {
			...curValue,
			path: updatedPath,
			...curValue.children
				&& { children: updatePaths(curValue.children, updatedPath) },
		};

		return { ...acc, [key]: updatedValue };
	},
	{}
);

const getHref = (data, path) => reduce(
	data, (acc, route) =>
		acc || (route.name === path
			? route
			: route.children && getHref(route.children, path)), false
);

const getBreadcrumbsValue = (updatedValue, pathname) =>
	pathname.split('/').filter(identity)
		.map((data) => {
			const { label, path } = getHref(updatedValue, data);

			return {
				children: label,
				href: path,
			};
		});

const Navigation = ({ options, onChange = identity }) => {
	const updatedValue = updatePaths(options);
	const route = useRoutes(getRoutes(updatedValue));
	const { pathname } = useLocation();

	useEffect(() => {
		const value = getBreadcrumbsValue(updatedValue, pathname);

		onChange(buildEvent({ value: value, options: updatedValue }));
	}, [pathname]);

	return <div>{ route }</div>;
};

export default Navigation;
