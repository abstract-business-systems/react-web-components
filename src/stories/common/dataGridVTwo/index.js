/* eslint-disable id-match */
import React, { useEffect, useState } from 'react';
import {
	useTable, useBlockLayout,
	useResizeColumns, useSortBy,
} from 'react-table';
import {
	Table,
	TableContainer,
	Paper,
	Box,
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Pagination from './Pagination';
import dataTable from '../helper/dataTable';
import Header from './header/Index';
import Body from './body';

const page = 0;
// eslint-disable-next-line no-magic-numbers
const rowsPerPageOptions = [5, 10, 25, { label: 'All', value: -1 }];
const rowsPerPage = rowsPerPageOptions[0];

const updateRows = (setState, rows) => {
	setState((preState) => ({
		...preState,
		rows: rowsPerPage > 0
			? rows.slice(preState.page * preState.rowsPerPage,
				preState.page * preState.rowsPerPage + preState.rowsPerPage)
			: preState.rows,
	}));
};

const MaterialTable = ({ columns, rows }) => {
	const [state, setState] = useState({ columns, rows, page, rowsPerPage });

	useEffect(() => {
		updateRows(setState, rows);
	}, [rows, state.page, state.rowsPerPage]);

	const { getTableProps, ...props } = useTable(
		{ columns: state.columns, data: state.rows },
		useBlockLayout, useResizeColumns, useSortBy
	);

	const context = { state, setState, props, rows };

	return (
		<Table component={ Box } { ...getTableProps() }>
			<Header { ...context }/>
			<Body { ...context }/>
			<Pagination { ...{ ...context, rowsPerPageOptions } }/>
		</Table>
	);
};

const DataGridVTwo = (args) => {
	const { value: rows } = args;
	const columns = dataTable.getColumns(args);

	return (
		<DndProvider backend={ HTML5Backend }>
			<TableContainer sx={ { maxHeight: 400 } } component={ Paper }>
				<MaterialTable { ...{ columns, rows } }/>
			</TableContainer>
		</DndProvider>
	);
};

export default DataGridVTwo;
