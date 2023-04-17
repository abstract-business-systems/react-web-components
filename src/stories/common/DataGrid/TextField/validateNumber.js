import Ajv from 'ajv';

const validator = new Ajv();

const ten = 10;
const decimalLength = 2;

const decimal = (number) => {
	const decimalParts = number.toString().split('.');

	return decimalParts.length === decimalLength
		? decimalParts[1].length
		: 0;
};

const getFractionPoint = (number) =>
	(isNaN(number) ? 0 : decimal(number));

const hasReminder = (schemaNum, testNum) => {
	const testNumDecimals = getFractionPoint(testNum);
	const schemaNumDecimals = getFractionPoint(schemaNum);

	const maxDecimalNum = Math.max(testNumDecimals, schemaNumDecimals);
	const multiplier = Math.pow(ten, maxDecimalNum);

	return Math.round(testNum * multiplier)
% Math.round(schemaNum * multiplier) !== 0;
};

const isTypeNumber = (schemaNum, testNum) => schemaNum === 0
|| !(typeof testNum === 'number' && isFinite(testNum));

const multipleValidator = (schemaNum, testNum) =>
	(isTypeNumber(schemaNum, testNum)
		? false
		: !hasReminder(schemaNum, testNum));

validator.removeKeyword('multipleOf');
validator.addKeyword({
	keyword: 'multipleOf',
	type: 'number',
	validate: multipleValidator,
});

const validateNumber = (schema, value) => validator.validate(schema, value);

export default validateNumber;
