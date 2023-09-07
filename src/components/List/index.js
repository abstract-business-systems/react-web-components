import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as HTMLBackend } from 'react-dnd-html5-backend';
import ListBody from './ListBody';
import { Paper, TableContainer } from '@mui/material';
import dataTable from '../common/helper/dataTable';
import { values } from '@laufire/utils/collection';

const List = (args) => {
	const { value: rows, Component } = args;
	const columns = dataTable.getColumns(args);

	const data = useMemo(() => ({ columns: columns, data: values(rows) }),
		[args]) ;

	const props = useTable(data);

	const context = { ...args, props, Component };

	return (
		<DndProvider backend={ HTMLBackend }>
			<TableContainer component={ Paper }>
				<ListBody { ...{ ...context, value: props.rows } }/>
			</TableContainer>
		</DndProvider>
	);
};

export default List;
