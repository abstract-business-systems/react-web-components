import React, { useState } from 'react';
import Document from '../../stories/common/Document';
import { identity } from '@laufire/utils/fn.js';
import Box from './Box';
import { Button } from '@mui/material';
import { rndString, rndValue } from '@laufire/utils/random';
import Section from '../../stories/common/Section';
import { map } from '@laufire/utils/collection';

const data = [
	{ name: 'parentOne', label: 'ParentOne' },
	{ name: 'parentTwo', label: 'ParentTwo' },
	{ name: 'parentThree', label: 'ParentThree' },
];

const IncreaseSection = (setState) =>
	<Button onClick={ () => {
		const name = rndString();

		setState((pre) => pre.concat({
			name: name, label: name,
			dynamic: true,
		}));
	} }
	>Increase Section</Button>;

const DeleteSection = (state, setState) =>
	<Button onClick={ () => {
		const value = rndValue(state);

		setState((pre) => pre.filter((item) => item.name !== value.name));
	} }
	>X</Button>;

const Navigation = ({ onLoad = identity }) => {
	const [state, setState] = useState(data);

	return <Document { ...{ onLoad } }>
		<Box title="Root"/>
		<IncreaseSection { ...{ setState } }/>
		<DeleteSection { ...{ state, setState } }/>
		{ map(state, (props) =>
			<Section key={ props.name } { ...props }>
				{ props.label }
			</Section>) }
	</Document>;
};

export default Navigation;
