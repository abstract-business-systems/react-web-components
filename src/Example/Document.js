import React, { useState } from 'react';
import Navigation from './Navigation';
import Breadcrumbs from '../components/common/Breadcrumbs';
import TreeView from '../components/common/TreeView';
import { useNavigate } from 'react-router-dom';

const Document = () => {
	const [state, setState] = useState({ value: [], options: {}});

	const onLoad = (target) => setState(target);

	const navigate = useNavigate();

	const onChange = ({ data }) => {
		navigate(data);
	};

	return <div>
		<Breadcrumbs { ...{ value: state.value, onChange: onChange } }/>
		<TreeView { ...{ ...state, onChange } }/>
		<Navigation { ...{ onLoad } }/>
	</div>;
};

export default Document;
