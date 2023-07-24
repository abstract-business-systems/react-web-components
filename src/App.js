import React, { useState } from 'react';
import './App.scss';
import { Checkbox, Switch } from '@mui/material';
import Breadcrumbs from './stories/common/Breadcrumbs';
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

const App = () => {
	const [state, setState] = useState({ value: [], options: {}});

	const onChange = ({ target }) => setState(target);

	return <div className="App">
		<Breadcrumbs { ...{ value: state.value } }/>
		<TreeView { ...state }/>
		<Navigation { ...{ options: value, onChange: onChange } }/>
	</div>;
};

export default App;
