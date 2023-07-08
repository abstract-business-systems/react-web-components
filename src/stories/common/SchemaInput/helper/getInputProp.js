const getInputProp = ({ schema }) => {
	const { maximum, minimum, multipleOf } = schema;

	return {
		min: minimum,
		max: maximum,
		step: multipleOf,
	};
};

export default getInputProp;
