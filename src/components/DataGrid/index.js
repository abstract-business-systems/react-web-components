/* eslint-disable max-lines-per-function */
import React, { useState } from 'react';
import { DataGrid as MuxDataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { nothing } from '@laufire/utils/fn';
import getAction from './helper/getAction';
import getColumns from './helper/getColumns';
import buildEvent from '../common/helper/buildEvent';
import { map, values } from '@laufire/utils/collection';

const DataGrid = ({ value, columns, style, onChange = nothing }) => {
	const [userInput, setUserInput] = useState(buildEvent({ value: '' }));
	const [rows, setRows] = useState(value);
	const props = { columns, rows, onChange };

	const newLocal = values(map(rows, ({ data }) => data));

	return (
		<Box sx={ { ...style } }>
			<MuxDataGrid
				rows={ newLocal }
				columns={ [
					...getColumns({
						...props, onChange: (evt) =>
							setUserInput(evt),
					}),
					...getAction({ ...props, userInput, setRows }),
				] }
				hideFooterPagination={ true }
				rowHeight={ 120 }
			/>
		</Box>);
};

export default DataGrid;
