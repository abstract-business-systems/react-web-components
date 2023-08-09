import React, { useState } from 'react';
import './App.scss';
import Nav from './components/Navigation';
import TreeView from './stories/common/TreeView';
import Breadcrumbs from './stories/common/Breadcrumbs';

const App = () => {
	const [state, setState] = useState({ value: [], options: {}});

	const onLoad = (target) => setState(target);

	return <div className="App">
		<Breadcrumbs { ...{ value: state.value } }/>
		<TreeView { ...state }/>
		<Nav { ...{ onLoad } }/>
	</div>;
};

export default App;
