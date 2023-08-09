import React from 'react';
import Section from './Section.js';
import Document from './Document';
import Box from './Box';
import { identity } from '@laufire/utils/fn.js';

// eslint-disable-next-line max-lines-per-function
const Navigation = ({ onLoad = identity }) =>
	<Document { ...{ onLoad } }>
		<Box title="Root">Title</Box>
		<Section label="ParentOne" name="parentOne">
			<Box title="ParentOne">Heading</Box>
			<Section label="ChildOne" name="childOne">
				<Box title="childOne">Sub-Box</Box>
				<Section label="GrandChildOne" name="grandChildOne">
					<Box title="GrandChildOne">Sub-sub-Box</Box>
				</Section>
				<Section label="GrandChildTwo" name="grandChildTwo">
					<Box title="GrandChildTwo">Sub-sub-Box</Box>
				</Section>
			</Section>
		</Section>
		<Section label="ParentTwo" name="parentTwo">
			<Box title="ParentTwo">Sub-Box</Box>
			<Section name="childOne" label="ChildOne">
				<Box title="ChildOne">Sub-Box</Box>
				<Section name="grandChildOne" label="GrandChildOne">
					<Box title="GrandChildOne">Sub-sub-Box</Box>
				</Section>
				<Section name="grandChildTwo" label="GrandChildTwo">
					<Box title="GrandChildTwo">Sub-sub-Box</Box>
				</Section>
			</Section>
		</Section>
	</Document>;

export default Navigation;
