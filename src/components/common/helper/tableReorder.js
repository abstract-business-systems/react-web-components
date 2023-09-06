import update from 'immutability-helper';
import buildEvent from './buildEvent';
import { identity } from '@laufire/utils/fn';

const itemTypes = {
	column: 'column',
	row: 'row',
};

const tableReorder = {
	shouldSwap: (isAboveMiddle, isDragBeforeHover) =>
		(isAboveMiddle && isDragBeforeHover)
		|| (!isAboveMiddle && !isDragBeforeHover),

	isMovePosition: (context) => {
		const { data: { index }, item, monitor, ref } = context;
		const hoverBoundingRect = ref.current.getBoundingClientRect();
		const hoverClientY = monitor.getClientOffset().y
		- hoverBoundingRect.top;
		const half = 2;
		const hoverMiddleY = (hoverBoundingRect.bottom
			- hoverBoundingRect.top) / half;
		const isDragEqualHover = item.index === index;
		const isDragBeforeHover = item.index < index;
		const isAboveMiddle = hoverClientY < hoverMiddleY;

		return !isDragEqualHover
		&& tableReorder.shouldSwap(isAboveMiddle, isDragBeforeHover);
	},

	reposition: ({
		value, onChange = identity,
		data: { dragIndex, hoverIndex },
	}) => {
		onChange(buildEvent({
			value: update(value, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, value[dragIndex]],
				],
			}).map((data) => data.original),
		}));
	},

	getHover: (context) => {
		const { data: { index }, item, ref, data } = context;
		const dragIndex = item.index;
		const hoverIndex = index;

		const shouldMoveColumn = ref.current
			&& tableReorder.isMovePosition(context);

		shouldMoveColumn
				&& tableReorder.reposition({
					...context,
					data: { ...data, dragIndex, hoverIndex },
				});

		item.index = hoverIndex;
	},

	getDrop: (context) => {
		const { position } = context;

		return {
			accept: itemTypes[position],
			hover: (item, monitor) => tableReorder.getHover({
				...context,
				item, monitor,
			}),
		};
	},

	getDrag: (context) => {
		const { data: { index }, position } = context;

		return {
			type: itemTypes[position],
			item: () => ({ id: index + 1, index: index }),
			collect: (monitor) => ({ isDragging: monitor.isDragging() }),
		};
	},
};

export default tableReorder;
