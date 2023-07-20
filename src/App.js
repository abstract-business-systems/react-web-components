import React from 'react';
import './App.scss';
import { useRoutes, useLocation } from 'react-router-dom';
import Sections from './stories/common/Sections';
import { Checkbox, Switch } from '@mui/material';
import Breadcrumbs from './stories/common/Breadcrumbs';
import { identity } from '@laufire/utils/fn';
import TreeView from './stories/common/TreeView';

const value = [
	{
		name: '/',
		label: 'Home',
		content: 'Test',
	},
	{
		name: '/widget',
		label: 'Widget',
		content: 'WidgetTest',
		children: [
			{
				name: '/widget/checkbox',
				label: 'Checkbox',
				content: <Checkbox/>,
			},
			{
				name: '/widget/switch',
				label: 'Switch',
				content: <Switch/>,
			},
		],
	},
];

const getHref = (data, path) => data.reduce((acc, route) => (
	acc || route.label.toLowerCase() === path
		? route
		: route.children && getHref(route.children, path)), false);

const getRoutes = (routes) =>
	routes.map((data) => ({
		path: data.name,
		element: <Sections { ...data }/>,
		...data.children && { children: getRoutes(data.children) },
	}));

const getBreadcrumbsValue = (pathname) => pathname.split('/').filter(identity)
	.map((path) => {
		const { label, name } = getHref(value, path);

		return {
			children: label,
			href: name,
		};
	});

const App = () => {
	const route = useRoutes(getRoutes(value));
	const { pathname } = useLocation();

	return <div className="App">
		<Breadcrumbs { ...{ value: getBreadcrumbsValue(pathname) } }/>
		<TreeView { ...{ value } }/>
		{ route }
	</div>;
};

export default App;
