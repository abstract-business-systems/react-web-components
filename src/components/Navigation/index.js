import React, { useState } from 'react';
import Document from '../../stories/common/Document';
import { identity } from '@laufire/utils/fn.js';
import Box from './Box';
import { Button } from '@mui/material';
import { rndString, rndValue } from '@laufire/utils/random';
import { map } from '@laufire/utils/collection';
import Section from '../../stories/common/Section';
import { peek } from '@laufire/utils/debug';

const data = [
	{ name: 'parentOne', label: 'ParentOne' },
	{ name: 'parentTwo', label: 'ParentTwo' },
	{ name: 'parentThree', label: 'ParentThree' },
];

// eslint-disable-next-line max-lines-per-function
const Navigation = ({ onLoad = identity }) => {
	const [state, setState] = useState(data);

	return <Document { ...{ onLoad } }>
		<Box title="Root"/>
		<Button onClick={ () => {
			const name = rndString();

			setState((pre) => pre.concat({
				name: name, label: name,
				dynamic: true,
			}));
		} }
		>Increase Section</Button>
		<Button onClick={ () => {
			const value = rndValue(state);

			peek({ value });
			setState((pre) => pre.filter((item) =>
				item.name !== value.name));
		} }
		>X</Button>
		{ /* <Section label="ParentOne" name="parentOne">
			<Box title="ParentOne"/>
			<Section label="ChildOne" name="childOne">
				<Box title="childOne"/>
				<Section label="GrandChildOne" name="grandChildOne">
					<Box title="GrandChildOne"/>
				</Section>
				<Section label="GrandChildTwo" name="grandChildTwo">
					<Box title="GrandChildTwo"/>
				</Section>
			</Section>
		</Section>
		<Section label="ParentTwo" name="parentTwo">
			<Box title="ParentTwo"/>
			<Section name="childOne" label="ChildOne">
				<Box title="ChildOne"/>
				<Section name="grandChildOne" label="GrandChildOne">
					<Box title="GrandChildOne"/>
				</Section>
				<Section name="grandChildTwo" label="GrandChildTwo">
					<Box title="GrandChildTwo"/>
				</Section>
			</Section>
		</Section> */ }
		{ map(state, (props) =>
			<Section key={ props.name } { ...props }>
				{ props.label }
			</Section>) }
	</Document>;
};

export default Navigation;
