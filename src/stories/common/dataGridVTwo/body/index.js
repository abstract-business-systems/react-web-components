/* eslint-disable max-len */
/* eslint-disable no-console */
import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useRef } from 'react';
import { FixedSizeList } from 'react-window';
import Dnd from '../Dnd';
import SchemaInput from '../../DataGrid/SchemaInput';
import { identity } from '@laufire/utils/fn';

const position = 'row';
// eslint-disable-next-line max-lines-per-function, react/display-name
const renderRow = (context) => ({ index, style }) => {
	const { props: { rows, prepareRow }, schema } = context;
	const row = rows[index];

	const ref = useRef();

	const { drop, drag, opacity } = Dnd({ ...context, position, index, ref });

	drag(drop(ref));
	console.log(row);

	prepareRow(row);
	const { key: dummy, ...props } = row.getRowProps();

	return (
		<TableRow
			ref={ ref }
			component={ Box }
			{ ...{ ...{ style: { opacity, ...style, ...props.style }}} }
		>
			{ row.cells.map((cell) => {
				const { title } = cell.column;
				const key = title.charAt().toLowerCase() + title.slice(1);

				// ! Schema prop
				// eslint-disable-next-line max-len
				console.log({ data: cell, value: cell.value, schema: schema[key], key: key });

				return <TableCell key={ cell.column.id } component={ Box }>
					<Box { ...cell.getCellProps() }>
						<SchemaInput { ...{ data: cell, value: cell.value, schema: schema[key], props: { setRows: identity }} }/>
					</Box>
				</TableCell>;
			}) }
		</TableRow>
	);
};
const Body = (context) => {
	const { props: { getTableBodyProps, rows }} = context;

	return <TableBody component={ Box } { ...getTableBodyProps() }>
		<FixedSizeList
			style={ { overflow: 'inherit' } }
			height={ 300 }
			itemCount={ rows.length }
			itemSize={ 60 }
			useIsScrolling={ true }
		>
			{ renderRow(context) }
		</FixedSizeList>
	</TableBody>;
};

export default Body;
