import { useDrag, useDrop } from 'react-dnd';
import ReactTableReorder from '../helper/ReactTableReorder';

const Dnd = ({ setState, index, position, ref }) => {
	const [, drop] = useDrop(ReactTableReorder
		.getDrop({
			...{ data: { index }},
			ref, position, setState,
		}));
	const [{ isDragging }, drag] = useDrag(ReactTableReorder
		.getDrag({ ...{ data: { index }}, position, setState }));
	const opacity = isDragging ? 0 : 1;

	return { drag, drop, opacity };
};

export default Dnd;
