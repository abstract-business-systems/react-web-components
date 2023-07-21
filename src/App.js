import React from 'react';
import './App.scss';
import { useLocation, useRoutes } from 'react-router-dom';
import Sections from './stories/common/Sections';
import { Checkbox, Switch } from '@mui/material';
import Breadcrumbs from './stories/common/Breadcrumbs';
import { identity } from '@laufire/utils/fn';
import { map, reduce, values } from '@laufire/utils/collection';
import TreeView from './stories/common/TreeView';

const value = {
	'': {
		name: '',
		label: 'Home',
		content: 'Test',
		children: {
			widget: {
				name: 'widget',
				label: 'Widget',
				content: 'WidgetTest',
				children: {
					checkbox: {
						name: 'checkbox',
						label: 'Checkbox',
						content: <Checkbox/>,
					},
					switch: {
						name: 'switch',
						label: 'Switch',
						children: {
							primary: {
								name: 'primary',
								label: 'Primary',
								content: <Switch color="primary"/>,
							},
							secondary: {
								name: 'secondary',
								label: 'Secondary',
								content: <Switch color="secondary"/>,
							},
						},
					},
				},
			},
		},
	},
};

const getHref = (data, path) => reduce(
	data, (acc, route) =>
		acc || (route.name === path
			? route
			: route.children && getHref(route.children, path)), false
);

const getRoutes = (routes) =>
	values(map(routes, (data) => ({
		path: data.name,
		element: <Sections { ...data }/>,
		...data.children && { children: getRoutes(data.children) },
	})));

const getBreadcrumbsValue = (updatedValue, pathname) =>
	pathname.split('/').filter(identity)
		.map((data) => {
			const { label, path } = getHref(updatedValue, data);

			return {
				children: label,
				href: path,
			};
		});

const updatePaths = (obj, path = '/') => reduce(
	obj,
	(
		updatedObj, curValue, key
	) => {
		const updatedPath = path === '/' ? `/${ key }` : `${ path }/${ key }`;
		const updatedValue = {
			...curValue,
			path: updatedPath,
			...curValue.children
				&& { children: updatePaths(curValue.children, updatedPath) },
		};

		return { ...updatedObj, [key]: updatedValue };
	},
	{}
);

const App = () => {
	const updatedValue = updatePaths(value);
	const route = useRoutes(getRoutes(updatedValue));
	const { pathname } = useLocation();

	return <div className="App">
		<Breadcrumbs { ...{
			value:
			getBreadcrumbsValue(updatedValue, pathname),
		} }
		/>
		<TreeView { ...{ value: updatedValue } }/>
		{ route }
	</div>;
};

export default App;
