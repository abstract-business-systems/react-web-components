
const buildEvent = ({
	error = null,
	newValue, status = 'success',
}) => ({
	target: {
		value: newValue,
		error: error,
		meta: { status },
	},
});

export default buildEvent;
