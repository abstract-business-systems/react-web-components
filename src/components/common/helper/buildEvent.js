const buildEvent = ({
	error = null,
	value, status = 'success', ...rest
}) => ({
	target: {
		value: value,
		error: error,
		meta: { status },
		...rest,
	},
	get data () {
		return this.target.value;
	},
});

export default buildEvent;
