import React from 'react';
import DataGrid from '../DataGrid';
import Section from '../Section';
import { map, values } from '@laufire/utils/collection';

const ResourceEditor = ({ schemas, value }) =>
	values(map(schemas, (schema, name) =>
		<Section key={ name } name={ name }>
			<DataGrid { ...{ value: value[name], columns: schema } }/>
		</Section>));

export default ResourceEditor;
