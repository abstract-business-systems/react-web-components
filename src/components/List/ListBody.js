import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import tableReorder from '../common/helper/tableReorder';
import { Box } from '@mui/material';

const Body = (context) => {
	const { data: { original }, Component } = context;
	const dropRef = useRef();
	const position = 'row';

	const [, drop] = useDrop(tableReorder
		.getDrop({ ...context, ref: dropRef, position: position }));

	const [{ isDragging }, drag] = useDrag(tableReorder
		.getDrag({ ...context, position }));

	const opacity = isDragging ? 0 : 1;

	drag(drop(dropRef));

	return (
		<Box { ...{ ref: dropRef, style: { opacity }} }>
			<Component { ...{ ...context, data: original } }/>
		</Box>
	);
};

const ListBody = (context) => {
	const { value, props: { prepareRow }} = context;

	return value.map((data, id) => prepareRow(data)
			|| <Body key={ id } { ...{ ...context, data, id } }/>);
};

export default ListBody;
