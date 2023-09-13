import React, { useState } from 'react';
import Document from '../../components/Document';
import { identity } from '@laufire/utils/fn.js';
import Box from './Box';
import { Button } from '@mui/material';
import { rndString, rndValue } from '@laufire/utils/random';
import Section from '../../components/Section';
import { map } from '@laufire/utils/collection';
import { ResourceEditor } from '../../components/WithState';
import RESTClient from '../../components/RESTClient';

const data = [
	{ name: 'parentOne', label: 'ParentOne' },
	{ name: 'parentTwo', label: 'ParentTwo' },
	{ name: 'parentThree', label: 'ParentThree' },
];

const IncreaseSection = ({ setState }) =>
	<Button onClick={ () => {
		const name = rndString();

		setState((pre) => pre.concat({
			name: name, label: name,
			dynamic: true,
		}));
	} }
	>Increase Section</Button>;

const DeleteSection = ({ state, setState }) =>
	<Button onClick={ () => {
		const value = rndValue(state);

		setState((pre) => pre.filter((item) => item.name !== value.name));
	} }
	>X</Button>;

const documentProps = {
	initialState: {
		apiClient: {
			data: {
				meta: {},
				values: {},
			},
		},
	},
};

const resourceProps = {
	value: '/apiClient/data/values/data',
	schemas: '/apiClient/data/meta/data',
	onLoad: [
		{
			to: '/apiClient/',
			action: 'list',
			entity: 'values',
		},
		{
			to: '/apiClient/',
			action: 'list',
			entity: 'meta',
		},
	],
};

const restClientProps = {
	name: 'apiClient',
	base: 'http://localhost:30102',
};

const Navigation = ({ onLoad = identity }) => {
	const [state, setState] = useState(data);

	return <Document { ...{ onLoad, ...documentProps } }>
		<Box title="Root"/>
		<IncreaseSection { ...{ setState } }/>
		<DeleteSection { ...{ state, setState } }/>
		{ map(state, (props) =>
			<Section key={ props.name } { ...props }>
				{ props.label }
			</Section>) }
		<RESTClient { ...restClientProps }/>
		<ResourceEditor { ...resourceProps }/>
	</Document>;
};

export default Navigation;
