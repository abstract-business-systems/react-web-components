
const buildEvent = ({
	error = null,
	newValue, status = 'success',
}) => ({
	target: {
		value: newValue,
		error: error,
		meta: { status },
	},
	get data () {
		return this.target.value;
	},
});

export default buildEvent;
