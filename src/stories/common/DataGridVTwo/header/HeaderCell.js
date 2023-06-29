import React, { useRef } from 'react';
import { Box, TableCell } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Dnd from '../Dnd';

const ReSize = ({ data: { isResizing, getResizerProps }}) =>
	<Box
		{ ...getResizerProps() }
		className={ `resizer ${ isResizing ? 'isResizing' : '' }` }
	/>;

const Sort = ({ data }) => <Box>
	{ data.isSorted && (
		data.isSortedDesc
			? <ArrowDownward/>
			: <ArrowUpward/>
	) }
</Box>;

const position = 'column';

const HeaderCell = (context) => {
	const { index, data } = context;
	const ref = useRef();
	const { drop, drag, opacity } = Dnd({ ...context, position, ref });

	drag(drop(ref));
	const { style, ...prop } = data
		.getHeaderProps(data.getSortByToggleProps());

	return <TableCell key={ index } component={ Box } style={ { opacity } }>
		<Box { ...{ sx: { ...style, display: 'flex' }, ...prop } }>
			<Box { ...{ className: 'drag', ref: ref } }>
				{ data.render('title') }</Box>
			<Sort { ...context }/>
			<ReSize { ...context }/>
		</Box>
	</TableCell>;
};

export default HeaderCell;
