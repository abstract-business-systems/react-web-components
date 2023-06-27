const buildEvent = ({
	error = null,
	value, status = 'success',
}) => ({
	target: {
		value: value,
		error: error,
		meta: { status },
	},
	get data () {
		return this.target.value;
	},
});

export default buildEvent;
