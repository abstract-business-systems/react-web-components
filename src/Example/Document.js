import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Breadcrumbs from '../stories/common/Breadcrumbs';
import TreeView from '../stories/common/TreeView';

const Document = () => {
	const [state, setState] = useState({ value: [], options: {}});

	const onLoad = (target) => setState(target);

	return <div>
		<Breadcrumbs { ...{ value: state.value } }/>
		<TreeView { ...state }/>
		<Navigation { ...{ onLoad } }/>
	</div>;
};

export default Document;
