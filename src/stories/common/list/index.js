import { React, useState } from 'react';
import { useTable } from 'react-table';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as HTMLBackend } from 'react-dnd-html5-backend';
import ListBody from './ListBody';
import { Paper, TableContainer } from '@mui/material';
import dataTable from '../helper/dataTable';

const List = (args) => {
	const { value: rows, Component } = args;
	const columns = dataTable.getColumns(args);

	const [state, setState] = useState({ columns, rows });
	const props = useTable({ columns: state.columns, data: state.rows },);

	const context = { ...args, state, setState, props, Component };

	return (
		<DndProvider backend={ HTMLBackend }>
			<TableContainer component={ Paper }>
				<ListBody { ...{ ...context, value: props.rows } }/>
			</TableContainer>
		</DndProvider>
	);
};

export default List;
