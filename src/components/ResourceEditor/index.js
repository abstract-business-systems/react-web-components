/* eslint-disable max-lines-per-function */
import React from 'react';
import DataGrid from '../DataGrid';
import Section from '../Section';
import GlobalContext from '../Document/GlobalContext';
import { map, merge, reduce, result, values } from '@laufire/utils/collection';
import { resolve } from '@laufire/utils/path';
import { defined } from '@laufire/utils/fn';

const getResources = ({ state, valuesPath }) => {
	const resources = defined(result(state, valuesPath), {});

	return reduce(
		resources, (acc, { data }) => merge(acc, data), {}
	);
};

const actions = [
	{
		icon: 'Edit',
		action: 'editRow',
	},
	{
		icon: 'Delete',
		action: 'deleteRow',
	},
];

const columnProps = { width: 200, editable: true };

const ResourceEditor = ({ value: valuesProp, schemas: schemasProp }) =>
	<GlobalContext.Consumer>
		{ ({ state, parentPath }) => {
			const valuesPath = resolve(parentPath, valuesProp);
			const schemasPath = resolve(parentPath, schemasProp);
			const resources = getResources({ state, valuesPath });
			const schemas = defined(result(state, schemasPath), {});

			return values(map(schemas, ({ data: { id, schema }}, key) => {
				const buildColumns = merge(
					{}, columnProps, {
						data: schema,
						actions: actions,
					}
				);

				return (
					<Section key={ key } name={ id }>
						<DataGrid
							{ ...{
								value: resources[id],
								columns: buildColumns,
							} }
						/>
					</Section>
				);
			}));
		} }
	</GlobalContext.Consumer>;

export default ResourceEditor;
