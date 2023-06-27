import { reduce } from '@laufire/utils/collection';

const dataTable = {
	getColumns: ({ schema }) => (schema
		? reduce(
			schema, (
				acc, val, key
			) => acc.concat({
				...val,
				accessor: key,
			}), []
		)
		: [{ title: '', accessor: 'default' }]),
};

export default dataTable;
