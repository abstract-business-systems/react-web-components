/* eslint-disable max-lines-per-function */
import React from 'react';
import DataGrid from '../DataGrid';
import Section from '../Section';
import GlobalContext from '../Document/GlobalContext';
import { map, merge, result, values } from '@laufire/utils/collection';
import { resolve } from '@laufire/utils/path';
import { defined } from '@laufire/utils/fn';

const getResources = ({ state, valuesPath }) => {
	const resources = result(state, valuesPath);

	return map(resources, (resource) => values(defined(resource.data, {})));
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

const ResourceEditor = ({
	value: valuesProp,
	schemas: schemasProp,
	...rest
}) =>
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
								...rest,
							} }
						/>
					</Section>
				);
			}));
		} }
	</GlobalContext.Consumer>
;

export default ResourceEditor;
