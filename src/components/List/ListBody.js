import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ReactTableReorder from '../common/helper/ReactTableReorder';
import { Box } from '@mui/material';

const Body = (context) => {
	const dropRef = useRef();
	const position = 'row';

	const [, drop] = useDrop(ReactTableReorder
		.getDrop({ ...context, ref: dropRef, position: position }));

	const [{ isDragging }, drag] = useDrag(ReactTableReorder
		.getDrag({ ...context, position }));

	const opacity = isDragging ? 0 : 1;

	drag(drop(dropRef));

	return (
		<Box { ...{ ref: dropRef, style: { opacity }} }>
			<context.Component { ...context }/>
		</Box>
	);
};

const ListBody = (context) => {
	const { value, props: { prepareRow }} = context;

	return value.map((data, id) => prepareRow(data)
			|| <Body key={ id } { ...{ ...context, data, id } }/>);
};

export default ListBody;
