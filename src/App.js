import React, { useState } from 'react';
import './App.scss';
import { Checkbox, Switch } from '@mui/material';
import Breadcrumbs from './stories/common/Breadcrumbs';
import { reduce } from '@laufire/utils/collection';
import TreeView from './stories/common/TreeView';
import Navigation from './stories/common/Navigation';

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
	const [state, setState] = useState();
	const updatedValue = updatePaths(value);

	const onChange = ({ data }) => setState(data);

	return <div className="App">
		<Breadcrumbs { ...{ value: state } }/>
		<TreeView { ...{ value: updatedValue } }/>
		<Navigation { ...{ options: value, onChange: onChange } }/>
	</div>;
};

export default App;
