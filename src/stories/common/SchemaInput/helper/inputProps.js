import buildInputProp from './buildInputProp';

const inputPropDate = ({ schema: { formatMinimum, formatMaximum }}) => ({
	min: formatMinimum,
	max: formatMaximum,
});

const inputProps = {
	'date': inputPropDate,
	'date-time': inputPropDate,
	'number': buildInputProp,
	'integer': buildInputProp,
};

export default inputProps;
