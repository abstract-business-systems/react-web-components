import { useDrag, useDrop } from 'react-dnd';
import tableReorder from '../common/helper/tableReorder';

const Dnd = ({ setState, index, position, ref }) => {
	const [, drop] = useDrop(tableReorder
		.getDrop({
			...{ data: { index }},
			ref, position, setState,
		}));
	const [{ isDragging }, drag] = useDrag(tableReorder
		.getDrag({ ...{ data: { index }}, position, setState }));
	const opacity = isDragging ? 0 : 1;

	return { drag, drop, opacity };
};

export default Dnd;
