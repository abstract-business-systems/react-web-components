const getDateProp = ({ schema: { formatMinimum, formatMaximum }}) => ({
	min: formatMinimum,
	max: formatMaximum,
});

export default getDateProp;
