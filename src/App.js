import React from 'react';
import './App.scss';
import { useRoutes, useLocation } from 'react-router-dom';
import Sections from './stories/common/Sections';
import { Checkbox, Switch } from '@mui/material';
import NavMenu from './stories/common/NavMenu';
import Breadcrumbs from './stories/common/Breadcrumbs';

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

const App = () => {
	const getRoutes = (routes) =>
		routes.map((data) => ({
			path: data.name,
			element: <Sections { ...data }/>,
			...data.children && { children: getRoutes(data.children) },
		}));

	const route = useRoutes(getRoutes(value));
	const { pathname } = useLocation();

	const breadcrumbsValue = pathname.split('/').filter((x) => x)
		.map((path) => ({
			children: path,
			href: getHref(value, path).name,
		}));

	return <div className="App">
		<Breadcrumbs { ...{ value: breadcrumbsValue } }/>
		<NavMenu { ...{ value } }/>
		{ route }
	</div>;
};

export default App;
