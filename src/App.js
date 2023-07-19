import React from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import Sections from './stories/common/Sections';
import { Checkbox, Switch } from '@mui/material';
import NavMenu from './stories/common/NavMenu';

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

const App = () => {
	const getRoutes = (routes) =>
		routes.map((data) => ({
			path: data.name,
			element: <Sections { ...data }/>,
			...data.children && { children: getRoutes(data.children) },
		}));

	const route = useRoutes(getRoutes(value));

	return <div className="App">
		<NavMenu { ...{ value } }/>
		{ route }
	</div>;
};

export default App;
