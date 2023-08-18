import update from 'immutability-helper';

const itemTypes = {
	column: 'column',
	row: 'row',
};

const ReactTableReorder = {
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
		&& ReactTableReorder.shouldSwap(isAboveMiddle, isDragBeforeHover);
	},

	reposition: ({ setState, data: { dragIndex, hoverIndex }, position }) => {
		setState((prevState) => ({
			...prevState,
			[`${ position }s`]: update(prevState[`${ position }s`], {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, prevState[`${ position }s`][dragIndex]],
				],
			}),
		}));
	},

	getHover: (context) => {
		const { data: { index }, item, ref, data } = context;
		const dragIndex = item.index;
		const hoverIndex = index;

		const shouldMoveColumn = ref.current
	&& ReactTableReorder.isMovePosition(context);

		shouldMoveColumn
	&& ReactTableReorder
		.reposition({ ...context, data: { ...data, dragIndex, hoverIndex }});

		item.index = hoverIndex;
	},

	getDrop: (context) => {
		const { position } = context;

		return {
			accept: itemTypes[position],
			hover: (item, monitor) => ReactTableReorder.getHover({
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

export default ReactTableReorder;
